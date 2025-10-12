// Uses environment variables to switch between development and production URLs
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
console.log(API_BASE_URL);
console.log(import.meta.env);

const getApiUrl = (endpoint) => {
  // Removing leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

export default getApiUrl;