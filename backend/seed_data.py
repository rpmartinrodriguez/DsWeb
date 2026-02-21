"""
Script to seed initial data into MongoDB
Run: python seed_data.py
"""
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
import os
from datetime import datetime
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Sample data
PRODUCTS = [
    {
        "_id": "prod-001",
        "name": "Torta de Tres Leches",
        "category": "Tortas",
        "description": "Deliciosa torta empapada en tres tipos de leche, coronada con merengue suave",
        "price": 45000,
        "image": "https://images.unsplash.com/photo-1696721497670-d57754966c1e",
        "active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "_id": "prod-002",
        "name": "Croissants Artesanales",
        "category": "Panadería",
        "description": "Croissants hojaldrados recién horneados, crujientes por fuera y suaves por dentro",
        "price": 3500,
        "image": "https://images.pexels.com/photos/192933/pexels-photo-192933.jpeg",
        "active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "_id": "prod-003",
        "name": "Torta de Bodas Personalizada",
        "category": "Eventos",
        "description": "Elegante torta de varios pisos, decorada con flores y detalles personalizados",
        "price": 350000,
        "image": "https://images.unsplash.com/photo-1727831477596-74b83abfaf1e",
        "active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "_id": "prod-004",
        "name": "Bandeja de Postres Finos",
        "category": "Postres",
        "description": "Selección de mini postres perfectos para eventos y celebraciones",
        "price": 65000,
        "image": "https://images.unsplash.com/photo-1737700089128-cbbb2dc71631",
        "active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "_id": "prod-005",
        "name": "Tartas de Frutas",
        "category": "Postres",
        "description": "Tartas frescas con frutas de temporada y crema pastelera",
        "price": 35000,
        "image": "https://images.unsplash.com/photo-1739132124985-6c9277e268b5",
        "active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "_id": "prod-006",
        "name": "Pasteles Individuales",
        "category": "Postres",
        "description": "Mini pasteles perfectos para disfrutar en cualquier momento",
        "price": 8500,
        "image": "https://images.pexels.com/photos/12743269/pexels-photo-12743269.jpeg",
        "active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
]

TESTIMONIALS = [
    {
        "_id": "test-001",
        "name": "María González",
        "rating": 5,
        "comment": "¡La torta de mi boda fue un sueño hecho realidad! No solo era hermosa, sino que todos nuestros invitados quedaron encantados con el sabor. Totalmente recomendado.",
        "date": datetime(2024, 1, 15),
        "approved": True,
        "created_at": datetime.utcnow()
    },
    {
        "_id": "test-002",
        "name": "Carlos Ramírez",
        "rating": 5,
        "comment": "Los croissants de DulceSal son los mejores de la ciudad. Cada mañana paso a comprar y nunca me decepcionan. Calidad artesanal incomparable.",
        "date": datetime(2024, 2, 20),
        "approved": True,
        "created_at": datetime.utcnow()
    },
    {
        "_id": "test-003",
        "name": "Ana Martínez",
        "rating": 5,
        "comment": "Pedí una torta personalizada para el cumpleaños de mi hija y superó todas mis expectativas. La atención al detalle es impresionante.",
        "date": datetime(2024, 3, 10),
        "approved": True,
        "created_at": datetime.utcnow()
    }
]

SITE_CONFIG = [
    {"key": "phone", "value": "+57 300 123 4567", "updated_at": datetime.utcnow()},
    {"key": "email", "value": "contacto@dulcesal.com", "updated_at": datetime.utcnow()},
    {"key": "address", "value": "Calle 123 #45-67, Bogotá, Colombia", "updated_at": datetime.utcnow()},
    {"key": "hours", "value": "Lunes a Sábado: 8:00 AM - 7:00 PM | Domingo: 9:00 AM - 5:00 PM", "updated_at": datetime.utcnow()},
    {"key": "instagram", "value": "https://www.instagram.com/dulcesal_pasteleria", "updated_at": datetime.utcnow()},
    {"key": "whatsapp", "value": "https://wa.me/573001234567", "updated_at": datetime.utcnow()}
]

async def seed_database():
    """Seed the database with initial data"""
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ.get('DB_NAME', 'dulcesal')]
    
    print("🌱 Seeding database...")
    
    # Clear existing data
    await db.products.delete_many({})
    await db.testimonials.delete_many({})
    await db.site_config.delete_many({})
    
    # Insert products
    await db.products.insert_many(PRODUCTS)
    print(f"✅ Inserted {len(PRODUCTS)} products")
    
    # Insert testimonials
    await db.testimonials.insert_many(TESTIMONIALS)
    print(f"✅ Inserted {len(TESTIMONIALS)} testimonials")
    
    # Insert site config
    await db.site_config.insert_many(SITE_CONFIG)
    print(f"✅ Inserted {len(SITE_CONFIG)} site config items")
    
    print("✨ Database seeded successfully!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
