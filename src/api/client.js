import axios from 'axios';

// Base API configuration pointing to FastAPI backend with environment fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Attach JWT Bearer Token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('creatorpilot_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401s and token expiration
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and notify app
      localStorage.removeItem('creatorpilot_token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Mapped FastAPI Endpoint Methods (Matches PDF Section 11)
export const authAPI = {
  register: (userData) => apiClient.post('/auth/register', userData),
  login: (credentials) => apiClient.post('/auth/login', credentials),
  getMe: () => apiClient.get('/users/me'),
};

export const ideasAPI = {
  create: (idea) => apiClient.post('/ideas', idea),
  getAll: (params) => apiClient.get('/ideas', { params }),
};

export const aiAPI = {
  generateStrategy: (payload) => apiClient.post('/ai/strategy', payload),
  generateScript: (payload) => apiClient.post('/ai/script', payload),
  repurpose: (payload) => apiClient.post('/ai/repurpose', payload),
  reviewScript: (payload) => apiClient.post('/ai/review-script', payload),
};

export const scriptsAPI = {
  getAll: () => apiClient.get('/scripts'),
  create: (script) => apiClient.post('/scripts', script),
  update: (id, script) => apiClient.put(`/scripts/${id}`, script),
};

export const calendarAPI = {
  getAll: () => apiClient.get('/calendar'),
  create: (entry) => apiClient.post('/calendar', entry),
  patch: (id, updates) => apiClient.patch(`/calendar/${id}`, updates),
};

export const audienceAPI = {
  analyze: (commentsPayload) => apiClient.post('/audience/analyze', commentsPayload),
};

export const campaignsAPI = {
  getAll: () => apiClient.get('/campaigns'),
  create: (campaign) => apiClient.post('/campaigns', campaign),
};

export const analyticsAPI = {
  getSummary: () => apiClient.get('/analytics/summary'),
};

export default apiClient;
