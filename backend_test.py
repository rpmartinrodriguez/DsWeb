#!/usr/bin/env python3
"""
DulceSal Pastry Website - Backend API Testing
Tests all backend functionality for the pastry e-commerce site
"""

import requests
import json
import sys
from datetime import datetime
from pathlib import Path

class DulceSalAPITester:
    def __init__(self, base_url="https://dulce-control.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []
        
        print(f"🏪 Testing DulceSal Pastry API at: {self.api_url}")

    def run_test(self, name, method, endpoint, expected_status, data=None, expected_count=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # Check expected count for arrays
                if expected_count is not None and response.content:
                    try:
                        response_data = response.json()
                        if isinstance(response_data, list):
                            actual_count = len(response_data)
                            if actual_count >= expected_count:
                                print(f"   📊 Count check passed - Found {actual_count} items (expected >= {expected_count})")
                            else:
                                success = False
                                print(f"   ⚠️  Count check failed - Found {actual_count} items (expected >= {expected_count})")
                    except Exception as e:
                        print(f"   ⚠️  Could not verify count: {e}")
                
                return success, response.json() if response.content and response.headers.get('content-type', '').startswith('application/json') else {}
            else:
                error_msg = f"Expected {expected_status}, got {response.status_code}"
                self.failed_tests.append({
                    'test': name,
                    'endpoint': endpoint,
                    'error': error_msg,
                    'response': response.text[:200] if response.text else 'No response body'
                })
                print(f"❌ Failed - {error_msg}")
                print(f"   Response: {response.text[:200] if response.text else 'No response'}")
                return False, {}

        except requests.exceptions.ConnectionError as e:
            error_msg = f"Connection error: {str(e)}"
            self.failed_tests.append({
                'test': name,
                'endpoint': endpoint,
                'error': error_msg,
                'response': 'Connection failed'
            })
            print(f"❌ Failed - {error_msg}")
            return False, {}
        except Exception as e:
            error_msg = f"Error: {str(e)}"
            self.failed_tests.append({
                'test': name,
                'endpoint': endpoint,
                'error': error_msg,
                'response': str(e)
            })
            print(f"❌ Failed - {error_msg}")
            return False, {}

    def test_health_check(self):
        """Test basic health check"""
        return self.run_test("Health Check", "GET", "", 404)  # Root endpoint not available

    def test_api_root(self):
        """Test API root endpoint"""
        success, response = self.run_test("API Root", "GET", "", 200)
        return success

    def test_get_products(self):
        """Test getting products - should return 6 products"""
        success, response = self.run_test("Get Products", "GET", "products", 200, expected_count=6)
        if success and isinstance(response, list):
            print(f"   📋 Products found: {len(response)}")
            for product in response[:3]:  # Show first 3 products
                print(f"      - {product.get('name', 'Unknown')} ({product.get('category', 'Unknown')})")
        return success, response

    def test_get_testimonials(self):
        """Test getting approved testimonials"""
        success, response = self.run_test("Get Testimonials", "GET", "testimonials", 200)
        if success and isinstance(response, list):
            print(f"   💬 Approved testimonials found: {len(response)}")
        return success, response

    def test_get_config(self):
        """Test getting site configuration"""
        success, response = self.run_test("Get Site Config", "GET", "config", 200)
        if success:
            print("   ⚙️  Site configuration loaded successfully")
            expected_keys = ['phone', 'email', 'address', 'hours', 'instagram', 'whatsapp']
            for key in expected_keys:
                if key in response:
                    print(f"      - {key}: ✓")
                else:
                    print(f"      - {key}: ❌ Missing")
        return success, response

    def test_submit_contact(self):
        """Test contact form submission"""
        test_contact = {
            "name": "Test Customer",
            "email": "test@example.com",
            "phone": "+57 300 123 4567",
            "message": "Este es un mensaje de prueba para verificar el formulario de contacto."
        }
        
        success, response = self.run_test("Submit Contact", "POST", "contact", 201, data=test_contact)
        return success, response

    def test_create_order(self):
        """Test order creation"""
        # First get products to use in order
        products_success, products = self.test_get_products()
        if not products_success or not products:
            print("   ⚠️  Cannot test orders without products")
            return False, {}

        # Use first product for test order
        test_product = products[0]
        test_order = {
            "customer_name": "Cliente de Prueba",
            "customer_email": "prueba@example.com",
            "customer_phone": "+57 300 123 4567",
            "delivery_address": "Calle Test 123, Bogotá, Colombia",
            "items": [{
                "product_id": test_product['id'],
                "product_name": test_product['name'],
                "quantity": 2,
                "unit_price": test_product['price'],
                "subtotal": test_product['price'] * 2
            }],
            "notes": "Pedido de prueba"
        }
        
        success, response = self.run_test("Create Order", "POST", "orders", 201, data=test_order)
        if success:
            print(f"   📋 Order created with number: {response.get('order_number', 'Unknown')}")
            print(f"   💰 Order total: ${response.get('total', 0)}")
        return success, response

    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 70)
        print("🚀 STARTING DULCESAL BACKEND API TESTS")
        print("=" * 70)

        # Test basic connectivity first
        print("\n📡 Testing Basic Connectivity...")
        self.test_api_root()

        # Test all endpoints
        print("\n🛍️  Testing Product Endpoints...")
        self.test_get_products()

        print("\n💬 Testing Testimonial Endpoints...")
        self.test_get_testimonials()

        print("\n⚙️  Testing Configuration Endpoints...")
        self.test_get_config()

        print("\n📧 Testing Contact Endpoints...")
        self.test_submit_contact()

        print("\n📦 Testing Order Endpoints...")
        self.test_create_order()

        # Print final results
        print("\n" + "=" * 70)
        print("📊 FINAL TEST RESULTS")
        print("=" * 70)
        print(f"Total tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {len(self.failed_tests)}")
        print(f"Success rate: {(self.tests_passed/self.tests_run*100):.1f}%")

        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for fail in self.failed_tests:
                print(f"  - {fail['test']}: {fail['error']}")
                if fail['response'] != 'Connection failed':
                    print(f"    Response: {fail['response'][:100]}...")

        return self.tests_passed == self.tests_run

def main():
    """Main test execution"""
    tester = DulceSalAPITester()
    
    try:
        all_passed = tester.run_all_tests()
        return 0 if all_passed else 1
    except KeyboardInterrupt:
        print("\n⚠️  Tests interrupted by user")
        return 1
    except Exception as e:
        print(f"\n💥 Unexpected error during testing: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())