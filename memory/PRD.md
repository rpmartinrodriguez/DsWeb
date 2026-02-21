# DulceSal Pastelería - Product Requirements Document

## Original Problem Statement
Create a website for Dulcesal Pastelería bakery based on their Instagram profile. The site should have a vintage pink design, a backend system to manage content, and an online ordering system with an admin panel.

## User Personas
1. **Customer**: Browses products, adds items to cart, places orders
2. **Admin**: Manages products, views/updates orders, approves testimonials

## Core Requirements
- [x] Website with vintage pink aesthetic
- [x] Dynamic product display from database
- [x] Shopping cart functionality
- [x] Checkout/order placement
- [x] Admin panel with authentication
- [x] Product management (CRUD)
- [x] Order management with status updates
- [x] Testimonial management

---

## Architecture

### Frontend (React)
- **Location**: `/app/frontend`
- **Framework**: React with React Router
- **Styling**: TailwindCSS with vintage pink theme
- **Components**: `/app/frontend/src/components/ui/` (Shadcn)
- **State Management**: React Context (CartContext, AuthContext)

### Backend (FastAPI)
- **Location**: `/app/backend`
- **Framework**: FastAPI with async support
- **Database**: MongoDB via motor async driver
- **Authentication**: JWT tokens (24h expiration)

### Key Files
- `backend/server.py` - Main FastAPI app
- `backend/routes.py` - API endpoints
- `backend/auth.py` - JWT authentication
- `backend/models.py` - Pydantic models
- `frontend/src/App.js` - Main router
- `frontend/src/services/api.js` - API client

---

## Implemented Features

### Phase 1 - Website (COMPLETED)
- [x] Hero section with bakery branding
- [x] Products grid with categories
- [x] Services section
- [x] About section
- [x] Testimonials carousel
- [x] Contact form
- [x] Footer with social links

### Phase 2 - Backend & Ordering (COMPLETED)
- [x] MongoDB integration
- [x] Products API (CRUD)
- [x] Testimonials API
- [x] Orders API
- [x] Site config API
- [x] Shopping cart (CartContext)
- [x] Checkout flow

### Phase 3 - Admin Panel (COMPLETED - Dec 2025)
- [x] JWT Authentication system
- [x] Protected admin routes
- [x] Admin login page (/admin/login)
- [x] Admin dashboard (/admin)
- [x] Products management tab
- [x] Orders management with status updates
- [x] Testimonials approval
- [x] Logout functionality

---

## API Endpoints

### Public Endpoints
- `GET /api/products` - List active products
- `GET /api/testimonials` - List approved testimonials
- `GET /api/config` - Site configuration
- `POST /api/orders` - Create order
- `POST /api/contact` - Submit contact form
- `POST /api/testimonials` - Submit testimonial

### Protected Endpoints (require JWT)
- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product
- `GET /api/orders` - List all orders
- `PUT /api/orders/{id}/status` - Update order status
- `PUT /api/testimonials/{id}/approve` - Approve testimonial
- `DELETE /api/testimonials/{id}` - Delete testimonial
- `PUT /api/config` - Update site config

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/logout` - Logout

---

## Database Schema

### Products
```json
{
  "name": "string",
  "category": "string",
  "description": "string",
  "price": "float",
  "image": "string (URL)",
  "active": "boolean",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### Orders
```json
{
  "order_number": "string",
  "customer_name": "string",
  "customer_email": "string",
  "customer_phone": "string",
  "delivery_address": "string",
  "items": [{"product_id", "product_name", "quantity", "unit_price", "subtotal"}],
  "total": "float",
  "status": "pending|confirmed|preparing|completed|cancelled",
  "notes": "string",
  "created_at": "datetime"
}
```

---

## Credentials
- **Admin Username**: admin
- **Admin Password**: dulcesal2024

---

## Remaining Tasks (P2 - Future)
- [ ] Image upload functionality for products
- [ ] WhatsApp integration for order notifications
- [ ] Email notifications for orders
- [ ] Password change feature for admin
- [ ] Multiple admin users support

---

## Test Reports
- `/app/test_reports/iteration_1.json` - Initial testing
- `/app/test_reports/iteration_2.json` - Admin auth testing (100% backend, 95% frontend)

---

**Last Updated**: December 2025
**Status**: Production Ready - Admin Panel Complete
