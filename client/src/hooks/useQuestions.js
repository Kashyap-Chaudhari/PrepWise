import { useState, useEffect, useCallback } from 'react';
import questionService from '../services/questionService';

const useQuestions = (params = {}) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    currentPage: 1,
  });

  const fetchQuestions = useCallback(async (queryParams = {}) => {
    setLoading(true);
    setError(null);
    try {
      const mergedParams = { ...params, ...queryParams };
      const res = await questionService.getQuestions(mergedParams);
      setQuestions(res.data.questions);
      setPagination({
        total: res.data.total,
        totalPages: res.data.totalPages,
        currentPage: res.data.currentPage,
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch questions');
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBySubject = useCallback(async (subject, queryParams = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await questionService.getQuestionsBySubject(subject, queryParams);
      setQuestions(res.data.questions);
      setPagination({
        total: res.data.total,
        totalPages: res.data.totalPages,
        currentPage: res.data.currentPage,
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch questions');
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    questions,
    loading,
    error,
    pagination,
    fetchQuestions,
    fetchBySubject,
    setQuestions,
  };
};

export default useQuestions;
