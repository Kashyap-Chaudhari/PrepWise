import { useState, useEffect, useCallback } from 'react';
import questionService from '../services/questionService';

import { generateDSATopicQuestions, generateTechnicalQuestions, generateAptitudeQuestions } from '../data/mockQuestions';

const useQuestions = (params = {}) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    currentPage: 1,
  });

  const getFallbackDataset = (mergedParams) => {
    if (mergedParams.category === 'coding' && (mergedParams.subject || mergedParams.topic)) {
      return generateCodingLanguageQuestions(mergedParams.subject || mergedParams.topic);
    }
    if (mergedParams.category === 'coding') {
      return generateCodingLanguageQuestions('Python');
    }
    if (mergedParams.category === 'dsa' && mergedParams.topic) {
      return generateDSATopicQuestions(mergedParams.topic);
    }
    if (mergedParams.category === 'technical') {
      return generateTechnicalQuestions();
    }
    if (mergedParams.category === 'aptitude') {
      return generateAptitudeQuestions();
    }
    if (mergedParams.category === 'dsa') {
      return generateDSATopicQuestions('Arrays');
    }
    return generateTechnicalQuestions();
  };

  const fetchQuestions = useCallback(async (queryParams = {}) => {
    setLoading(true);
    setError(null);
    const mergedParams = { ...params, ...queryParams };
    try {
      const res = await questionService.getQuestions(mergedParams);
      if (res.data?.questions && res.data.questions.length > 0) {
        setQuestions(res.data.questions);
        setPagination({
          total: res.data.total,
          totalPages: res.data.totalPages,
          currentPage: res.data.currentPage,
        });
      } else {
        const fallback = getFallbackDataset(mergedParams);
        setQuestions(fallback);
        setPagination({ total: fallback.length, totalPages: 1, currentPage: 1 });
      }
    } catch (err) {
      const fallback = getFallbackDataset(mergedParams);
      setQuestions(fallback);
      setPagination({ total: fallback.length, totalPages: 1, currentPage: 1 });
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBySubject = useCallback(async (subject, queryParams = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await questionService.getQuestionsBySubject(subject, queryParams);
      if (res.data?.questions && res.data.questions.length > 0) {
        setQuestions(res.data.questions);
        setPagination({
          total: res.data.total,
          totalPages: res.data.totalPages,
          currentPage: res.data.currentPage,
        });
      } else {
        const fallback = getFallbackDataset({ category: 'technical', subject });
        setQuestions(fallback);
        setPagination({ total: fallback.length, totalPages: 1, currentPage: 1 });
      }
    } catch (err) {
      const fallback = getFallbackDataset({ category: 'technical', subject });
      setQuestions(fallback);
      setPagination({ total: fallback.length, totalPages: 1, currentPage: 1 });
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
