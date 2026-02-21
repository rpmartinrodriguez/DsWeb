from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid

# Product Models
class ProductBase(BaseModel):
    name: str
    category: str
    description: str
    price: float
    image: str
    active: bool = True

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

# Testimonial Models
class TestimonialBase(BaseModel):
    name: str
    rating: int = Field(ge=1, le=5)
    comment: str

class TestimonialCreate(TestimonialBase):
    pass

class Testimonial(TestimonialBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    date: datetime = Field(default_factory=datetime.utcnow)
    approved: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

# Site Config Models
class SiteConfigUpdate(BaseModel):
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    hours: Optional[str] = None
    instagram: Optional[str] = None
    whatsapp: Optional[str] = None

class SiteConfig(BaseModel):
    phone: str
    email: str
    address: str
    hours: str
    instagram: str
    whatsapp: str

# Order Models
class OrderItem(BaseModel):
    product_id: str
    product_name: str
    quantity: int
    unit_price: float
    subtotal: float

class OrderCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    delivery_address: str
    items: List[OrderItem]
    notes: Optional[str] = None

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_number: str
    customer_name: str
    customer_email: str
    customer_phone: str
    delivery_address: str
    items: List[OrderItem]
    total: float
    status: str = "pending"  # pending, confirmed, preparing, completed, cancelled
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

class OrderStatusUpdate(BaseModel):
    status: str

# Contact Models
class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
