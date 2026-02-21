from fastapi import APIRouter, HTTPException, status
from typing import List
from models import (
    Product, ProductCreate,
    Testimonial, TestimonialCreate,
    SiteConfig, SiteConfigUpdate,
    Order, OrderCreate, OrderStatusUpdate,
    ContactMessage
)
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime

# Initialize router
router = APIRouter()

# Get database
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'dulcesal')]

# ==================== PRODUCTS ====================

@router.get("/products", response_model=List[Product])
async def get_products(active_only: bool = True):
    """Get all products (public endpoint)"""
    query = {"active": True} if active_only else {}
    products = await db.products.find(query).to_list(100)
    result = []
    for product in products:
        product['id'] = product.pop('_id')
        result.append(Product(**product))
    return result

@router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    """Get product by ID"""
    product = await db.products.find_one({"_id": product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product['id'] = product.pop('_id')
    return Product(**product)

@router.post("/products", response_model=Product, status_code=status.HTTP_201_CREATED)
async def create_product(product: ProductCreate):
    """Create new product"""
    product_dict = product.dict()
    product_dict["created_at"] = datetime.utcnow()
    product_dict["updated_at"] = datetime.utcnow()
    
    result = await db.products.insert_one(product_dict)
    created_product = await db.products.find_one({"_id": result.inserted_id})
    return Product(**{**created_product, "id": str(created_product["_id"])})

@router.put("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product: ProductCreate):
    """Update product"""
    product_dict = product.dict()
    product_dict["updated_at"] = datetime.utcnow()
    
    result = await db.products.update_one(
        {"_id": product_id},
        {"$set": product_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    
    updated_product = await db.products.find_one({"_id": product_id})
    return Product(**{**updated_product, "id": str(updated_product["_id"])})

@router.delete("/products/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(product_id: str):
    """Delete product (soft delete by setting active=False)"""
    result = await db.products.update_one(
        {"_id": product_id},
        {"$set": {"active": False, "updated_at": datetime.utcnow()}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")

# ==================== TESTIMONIALS ====================

@router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials(approved_only: bool = True):
    """Get all testimonials"""
    query = {"approved": True} if approved_only else {}
    testimonials = await db.testimonials.find(query).sort("date", -1).to_list(100)
    result = []
    for t in testimonials:
        t['id'] = t.pop('_id')
        result.append(Testimonial(**t))
    return result

@router.post("/testimonials", response_model=Testimonial, status_code=status.HTTP_201_CREATED)
async def create_testimonial(testimonial: TestimonialCreate):
    """Submit new testimonial"""
    testimonial_dict = testimonial.dict()
    testimonial_dict["date"] = datetime.utcnow()
    testimonial_dict["approved"] = False
    testimonial_dict["created_at"] = datetime.utcnow()
    
    result = await db.testimonials.insert_one(testimonial_dict)
    created = await db.testimonials.find_one({"_id": result.inserted_id})
    return Testimonial(**{**created, "id": str(created["_id"])})

@router.put("/testimonials/{testimonial_id}/approve", response_model=Testimonial)
async def approve_testimonial(testimonial_id: str):
    """Approve testimonial"""
    result = await db.testimonials.update_one(
        {"_id": testimonial_id},
        {"$set": {"approved": True}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    updated = await db.testimonials.find_one({"_id": testimonial_id})
    return Testimonial(**{**updated, "id": str(updated["_id"])})

@router.delete("/testimonials/{testimonial_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_testimonial(testimonial_id: str):
    """Delete testimonial"""
    result = await db.testimonials.delete_one({"_id": testimonial_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")

# ==================== SITE CONFIG ====================

@router.get("/config", response_model=SiteConfig)
async def get_config():
    """Get site configuration"""
    config_items = await db.site_config.find().to_list(100)
    config_dict = {item["key"]: item["value"] for item in config_items}
    
    # Default values if not set
    default_config = {
        "phone": "+57 300 123 4567",
        "email": "contacto@dulcesal.com",
        "address": "Calle 123 #45-67, Bogotá, Colombia",
        "hours": "Lunes a Sábado: 8:00 AM - 7:00 PM | Domingo: 9:00 AM - 5:00 PM",
        "instagram": "https://www.instagram.com/dulcesal_pasteleria",
        "whatsapp": "https://wa.me/573001234567"
    }
    
    return SiteConfig(**{**default_config, **config_dict})

@router.put("/config", response_model=SiteConfig)
async def update_config(config: SiteConfigUpdate):
    """Update site configuration"""
    config_dict = config.dict(exclude_none=True)
    
    for key, value in config_dict.items():
        await db.site_config.update_one(
            {"key": key},
            {"$set": {"value": value, "updated_at": datetime.utcnow()}},
            upsert=True
        )
    
    return await get_config()

# ==================== ORDERS ====================

@router.post("/orders", response_model=Order, status_code=status.HTTP_201_CREATED)
async def create_order(order: OrderCreate):
    """Create new order"""
    # Generate order number
    order_count = await db.orders.count_documents({})
    order_number = f"ORD-{datetime.utcnow().strftime('%Y%m%d')}-{order_count + 1:03d}"
    
    # Calculate total
    total = sum(item.subtotal for item in order.items)
    
    order_dict = order.dict()
    order_dict["order_number"] = order_number
    order_dict["total"] = total
    order_dict["status"] = "pending"
    order_dict["created_at"] = datetime.utcnow()
    order_dict["updated_at"] = datetime.utcnow()
    
    result = await db.orders.insert_one(order_dict)
    created_order = await db.orders.find_one({"_id": result.inserted_id})
    return Order(**{**created_order, "id": str(created_order["_id"])})

@router.get("/orders", response_model=List[Order])
async def get_orders():
    """Get all orders"""
    orders = await db.orders.find().sort("created_at", -1).to_list(100)
    return [Order(**{**order, "id": str(order["_id"])}) for order in orders]

@router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str):
    """Get order by ID"""
    order = await db.orders.find_one({"_id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return Order(**{**order, "id": str(order["_id"])})

@router.put("/orders/{order_id}/status", response_model=Order)
async def update_order_status(order_id: str, status_update: OrderStatusUpdate):
    """Update order status"""
    valid_statuses = ["pending", "confirmed", "preparing", "completed", "cancelled"]
    if status_update.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}")
    
    result = await db.orders.update_one(
        {"_id": order_id},
        {"$set": {"status": status_update.status, "updated_at": datetime.utcnow()}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    
    updated_order = await db.orders.find_one({"_id": order_id})
    return Order(**{**updated_order, "id": str(updated_order["_id"])})

# ==================== CONTACT ====================

@router.post("/contact", status_code=status.HTTP_201_CREATED)
async def submit_contact(contact: ContactMessage):
    """Submit contact form"""
    contact_dict = contact.dict()
    await db.contact_messages.insert_one(contact_dict)
    return {"message": "Contact form submitted successfully"}
