import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance
const apiClient = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==================== PRODUCTS ====================

export const getProducts = async () => {
  const response = await apiClient.get('/products');
  return response.data;
};

export const getProduct = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await apiClient.post('/products', product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await apiClient.put(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  await apiClient.delete(`/products/${id}`);
};

// ==================== TESTIMONIALS ====================

export const getTestimonials = async () => {
  const response = await apiClient.get('/testimonials');
  return response.data;
};

export const createTestimonial = async (testimonial) => {
  const response = await apiClient.post('/testimonials', testimonial);
  return response.data;
};

export const approveTestimonial = async (id) => {
  const response = await apiClient.put(`/testimonials/${id}/approve`);
  return response.data;
};

export const deleteTestimonial = async (id) => {
  await apiClient.delete(`/testimonials/${id}`);
};

// ==================== SITE CONFIG ====================

export const getSiteConfig = async () => {
  const response = await apiClient.get('/config');
  return response.data;
};

export const updateSiteConfig = async (config) => {
  const response = await apiClient.put('/config', config);
  return response.data;
};

// ==================== ORDERS ====================

export const createOrder = async (order) => {
  const response = await apiClient.post('/orders', order);
  return response.data;
};

export const getOrders = async () => {
  const response = await apiClient.get('/orders');
  return response.data;
};

export const getOrder = async (id) => {
  const response = await apiClient.get(`/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await apiClient.put(`/orders/${id}/status`, { status });
  return response.data;
};

// ==================== CONTACT ====================

export const submitContact = async (contact) => {
  const response = await apiClient.post('/contact', contact);
  return response.data;
};

export default apiClient;
