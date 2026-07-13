import api from './api';

export const progressService = {
  getProgress: (period = 'week') => api.get('/progress', { params: { period } }),
  getAnalytics: () => api.get('/progress/analytics'),
};

export default progressService;
