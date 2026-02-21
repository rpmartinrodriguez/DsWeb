"""
Tests for DulceSal Admin Authentication & Protected Routes
Tests: Login, Token verification, Protected routes, Logout
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Test credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "dulcesal2024"


class TestAuthLogin:
    """Test admin login functionality"""

    def test_login_success(self):
        """Test successful login with correct credentials"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
        )
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert "token_type" in data
        assert data["token_type"] == "bearer"
        assert "expires_in" in data
        assert isinstance(data["access_token"], str)
        assert len(data["access_token"]) > 0

    def test_login_wrong_password(self):
        """Test login with wrong password returns 401"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"username": ADMIN_USERNAME, "password": "wrongpassword"}
        )
        assert response.status_code == 401
        data = response.json()
        assert "detail" in data

    def test_login_wrong_username(self):
        """Test login with wrong username returns 401"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"username": "wronguser", "password": ADMIN_PASSWORD}
        )
        assert response.status_code == 401
        data = response.json()
        assert "detail" in data

    def test_login_empty_credentials(self):
        """Test login with empty credentials returns error"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"username": "", "password": ""}
        )
        assert response.status_code in [401, 422]


class TestTokenVerification:
    """Test token verification endpoint"""

    @pytest.fixture
    def auth_token(self):
        """Get a valid auth token"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
        )
        if response.status_code == 200:
            return response.json()["access_token"]
        pytest.skip("Could not get auth token")

    def test_verify_valid_token(self, auth_token):
        """Test token verification with valid token"""
        response = requests.get(
            f"{BASE_URL}/api/auth/verify",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["valid"] is True
        assert data["username"] == ADMIN_USERNAME

    def test_verify_invalid_token(self):
        """Test token verification with invalid token returns 401"""
        response = requests.get(
            f"{BASE_URL}/api/auth/verify",
            headers={"Authorization": "Bearer invalidtoken123"}
        )
        assert response.status_code == 401

    def test_verify_no_token(self):
        """Test token verification without token returns 403"""
        response = requests.get(f"{BASE_URL}/api/auth/verify")
        assert response.status_code == 403


class TestProtectedRoutes:
    """Test protected admin routes require authentication"""

    @pytest.fixture
    def auth_token(self):
        """Get a valid auth token"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
        )
        if response.status_code == 200:
            return response.json()["access_token"]
        pytest.skip("Could not get auth token")

    def test_orders_endpoint_requires_auth(self):
        """Test /api/orders requires authentication"""
        response = requests.get(f"{BASE_URL}/api/orders")
        assert response.status_code == 403
        data = response.json()
        assert "detail" in data

    def test_orders_endpoint_with_auth(self, auth_token):
        """Test /api/orders works with valid token"""
        response = requests.get(
            f"{BASE_URL}/api/orders",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)

    def test_create_product_requires_auth(self):
        """Test POST /api/products requires authentication"""
        product_data = {
            "name": "TEST_Product",
            "category": "Tortas",
            "description": "Test description",
            "price": 10000,
            "image": "https://example.com/test.jpg",
            "active": True
        }
        response = requests.post(f"{BASE_URL}/api/products", json=product_data)
        assert response.status_code == 403

    def test_create_product_with_auth(self, auth_token):
        """Test POST /api/products works with valid token"""
        product_data = {
            "name": "TEST_AuthProduct",
            "category": "Tortas",
            "description": "Test auth product",
            "price": 15000,
            "image": "https://example.com/test.jpg",
            "active": False  # inactive so it won't show on public
        }
        response = requests.post(
            f"{BASE_URL}/api/products",
            json=product_data,
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert response.status_code == 201
        data = response.json()
        assert data["name"] == "TEST_AuthProduct"
        assert "id" in data


class TestPublicEndpoints:
    """Test public endpoints don't require auth"""

    def test_products_public(self):
        """Test GET /api/products is public"""
        response = requests.get(f"{BASE_URL}/api/products")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)

    def test_testimonials_public(self):
        """Test GET /api/testimonials is public"""
        response = requests.get(f"{BASE_URL}/api/testimonials")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)

    def test_config_public(self):
        """Test GET /api/config is public"""
        response = requests.get(f"{BASE_URL}/api/config")
        assert response.status_code == 200
        data = response.json()
        assert "phone" in data
        assert "email" in data


class TestOrderStatusUpdate:
    """Test order status update functionality"""

    @pytest.fixture
    def auth_token(self):
        """Get a valid auth token"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
        )
        if response.status_code == 200:
            return response.json()["access_token"]
        pytest.skip("Could not get auth token")

    def test_update_order_status_requires_auth(self):
        """Test order status update requires auth"""
        response = requests.put(
            f"{BASE_URL}/api/orders/test-order-id/status",
            json={"status": "confirmed"}
        )
        assert response.status_code == 403

    def test_get_orders_and_verify_structure(self, auth_token):
        """Test getting orders and verify data structure"""
        response = requests.get(
            f"{BASE_URL}/api/orders",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert response.status_code == 200
        orders = response.json()
        if len(orders) > 0:
            order = orders[0]
            assert "id" in order
            assert "order_number" in order
            assert "customer_name" in order
            assert "status" in order
            assert "items" in order
            assert "total" in order


class TestLogout:
    """Test logout functionality"""

    def test_logout_endpoint(self):
        """Test logout endpoint returns success"""
        response = requests.post(f"{BASE_URL}/api/auth/logout")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
