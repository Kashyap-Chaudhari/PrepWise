import api from './api';

export const resultService = {
  submitResult: (data) => api.post('/results', data),
  getResults: (params = {}) => api.get('/results', { params }),
  getLeaderboard: () => api.get('/results/leaderboard'),
};

export default resultService;
