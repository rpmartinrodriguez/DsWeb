# DulceSal Pastelería - Product Requirements Document

## Original Problem Statement
Crear una página web basada en el perfil de Instagram: https://www.instagram.com/dulcesal_pasteleria

## Project Overview
**Type:** Bakery/Pastry Shop Website
**Stack:** React + FastAPI + MongoDB
**Purpose:** Professional website to showcase products, services, and enable customer contact

## User Personas
1. **Potential Customers**: Looking to order custom cakes, pastries for events
2. **Walk-in Customers**: Seeking information about products, location, hours
3. **Event Planners**: Need catering services for weddings, corporate events

## Core Requirements (Static)
- Hero section with brand identity
- Product showcase with categories
- Services information
- About us section
- Customer testimonials
- Contact form
- Responsive design
- Professional bakery aesthetic

## Implementation Status

### Phase 1: Frontend with Mock Data ✅ (Completed - Dec 2024)

**Completed Components:**
- ✅ Header with smooth scroll navigation and mobile menu
- ✅ Hero section with compelling CTAs and stats
- ✅ Products gallery with category filtering (6 products)
- ✅ Services section (4 service cards)
- ✅ About section with brand story
- ✅ Testimonials (3 customer reviews)
- ✅ Contact form with info cards
- ✅ Footer with social links

**Design Implementation:**
- ✅ Rose/pink color scheme (warm, bakery-appropriate)
- ✅ Professional spacing and typography
- ✅ Lucide-react icons (no emoji)
- ✅ Smooth animations and hover effects
- ✅ High-quality bakery images from Unsplash/Pexels
- ✅ Toast notifications for user feedback
- ✅ Mobile-responsive design

**Mock Data Location:** `/app/frontend/src/data/mock.js`
- Products with categories, prices, descriptions
- Testimonials with ratings
- Services information
- Contact information

## Prioritized Backlog

### Phase 2: Backend Development (P0 - Next Priority)

**API Endpoints Needed:**
1. `POST /api/contact` - Handle contact form submissions
2. `GET /api/products` - Fetch products from database
3. `POST /api/products` - Admin: Add new products
4. `GET /api/testimonials` - Fetch testimonials
5. `POST /api/testimonials` - Submit new testimonial

**Database Models:**
1. Products: name, category, description, price, image_url, created_at
2. ContactMessages: name, email, phone, message, timestamp, status
3. Testimonials: name, rating, comment, date, approved

**Integration Points:**
- Replace mock.js data with API calls
- Add loading states
- Error handling
- Form validation

### Phase 3: Enhancements (P1)

- Admin dashboard for managing products
- Image upload for products
- Email notifications for contact form
- Product search functionality
- Blog/Recipe section

### Phase 4: Advanced Features (P2)

- Online ordering system with cart
- Payment integration (Stripe)
- User accounts
- Order tracking
- Analytics dashboard

## Next Tasks
1. ✅ Complete frontend with mock data
2. Get user approval on design
3. Build backend API endpoints
4. Integrate frontend with backend
5. Test end-to-end functionality

---
**Last Updated:** December 2024
