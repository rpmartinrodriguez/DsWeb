# DulceSal Pastelería - Backend Development & Online Ordering System

## Phase 2: Backend Implementation

### Database Models

#### 1. Products
```python
{
  "_id": ObjectId,
  "name": str,
  "category": str,  # "Tortas", "Panadería", "Eventos", "Postres"
  "description": str,
  "price": float,
  "image": str,  # URL or base64
  "active": bool,
  "created_at": datetime,
  "updated_at": datetime
}
```

#### 2. Testimonials
```python
{
  "_id": ObjectId,
  "name": str,
  "rating": int,  # 1-5
  "comment": str,
  "date": datetime,
  "approved": bool,
  "created_at": datetime
}
```

#### 3. SiteConfig
```python
{
  "_id": ObjectId,
  "key": str,  # "phone", "email", "address", "hours", "instagram", etc.
  "value": str,
  "updated_at": datetime
}
```

#### 4. Orders
```python
{
  "_id": ObjectId,
  "order_number": str,  # "ORD-20241225-001"
  "customer_name": str,
  "customer_email": str,
  "customer_phone": str,
  "delivery_address": str,
  "items": [
    {
      "product_id": str,
      "product_name": str,
      "quantity": int,
      "unit_price": float,
      "subtotal": float
    }
  ],
  "total": float,
  "status": str,  # "pending", "confirmed", "preparing", "completed", "cancelled"
  "notes": str,
  "created_at": datetime,
  "updated_at": datetime
}
```

### API Endpoints

#### Products
- `GET /api/products` - Get all active products (public)
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create new product (admin)
- `PUT /api/products/{id}` - Update product (admin)
- `DELETE /api/products/{id}` - Delete product (admin)

#### Testimonials
- `GET /api/testimonials` - Get all approved testimonials (public)
- `POST /api/testimonials` - Submit new testimonial (public)
- `PUT /api/testimonials/{id}/approve` - Approve testimonial (admin)
- `DELETE /api/testimonials/{id}` - Delete testimonial (admin)

#### Site Configuration
- `GET /api/config` - Get all site configuration (public)
- `PUT /api/config` - Update site configuration (admin)

#### Orders
- `POST /api/orders` - Create new order (public)
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/{id}` - Get order by ID
- `PUT /api/orders/{id}/status` - Update order status (admin)

#### Contact
- `POST /api/contact` - Submit contact form (public)

### Frontend Integration

#### Remove Mock Data
- Delete `/app/frontend/src/data/mock.js`
- Create API service layer `/app/frontend/src/services/api.js`

#### New Features
1. **Shopping Cart**
   - Add to cart functionality
   - Cart sidebar/modal
   - Update quantities
   - Remove items

2. **Checkout Page**
   - Customer information form
   - Order summary
   - Submit order
   - Order confirmation

3. **Context/State Management**
   - CartContext for managing cart state
   - API integration for products, testimonials

### Implementation Order
1. Create database models in backend
2. Implement API endpoints
3. Create API service layer in frontend
4. Integrate products API
5. Add shopping cart functionality
6. Create checkout flow
7. Test end-to-end with testing_agent_v3

---
**Status:** Ready to implement
**Date:** December 2024
