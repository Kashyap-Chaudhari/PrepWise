import api from './api';

export const questionService = {
  getQuestions: (params = {}) => api.get('/questions', { params }),
  getQuestionsBySubject: (subject, params = {}) => api.get(`/questions/subject/${subject}`, { params }),
  getQuestion: (id) => api.get(`/questions/${id}`),
  getDailyChallenge: () => api.get('/questions/daily-challenge'),
  bookmarkQuestion: (id) => api.post(`/questions/${id}/bookmark`),
  getFavorites: () => api.get('/questions/user/favorites'),
  createQuestion: (data) => api.post('/questions', data),
  updateQuestion: (id, data) => api.put(`/questions/${id}`, data),
  deleteQuestion: (id) => api.delete(`/questions/${id}`),
};

export default questionService;
