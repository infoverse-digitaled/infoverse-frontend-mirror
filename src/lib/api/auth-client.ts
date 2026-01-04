import axios from 'axios';

/**
 * Axios client configured for Backend Authentication API
 */
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

// Log the backend connection URL for debugging
console.log('[Auth Client] Base URL:', baseURL);

const authApiClient = axios.create({
  baseURL,
  timeout: 30000, // Increased to 30s for AI responses
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authentication token
authApiClient.interceptors.request.use(
  (config) => {
    // Add token to requests if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
authApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      if (error.response.status === 401) {
        // Unauthorized - only redirect if not already on auth pages
        if (typeof window !== 'undefined') {
          const currentPath = window.location.pathname;
          const isAuthPage = currentPath.startsWith('/login') ||
                            currentPath.startsWith('/register') ||
                            currentPath.startsWith('/auth');

          // Only clear token and redirect if not on auth pages (prevent loops)
          if (!isAuthPage) {
            localStorage.removeItem('token');
            // Use replace to prevent back button loops
            window.location.replace('/login');
          }
        }
      }
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message);
    } else {
      // Error in request setup
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default authApiClient;
