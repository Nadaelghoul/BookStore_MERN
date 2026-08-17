export const API_BASE = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000');
export const IMAGE_BASE = `${API_BASE}/images`;
