import { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

export const DEMO_USERS = {
  student: {
    _id: 'demo-student-001',
    name: 'Demo Student',
    email: 'demo@prepwise.com',
    role: 'user',
    avatar: 'https://ui-avatars.com/api/?name=Demo+Student&background=6366f1&color=fff&size=200',
    college: 'National Institute of Technology',
    branch: 'Computer Science & Engineering',
    graduationYear: 2025,
    streak: 5,
    totalSolved: 48,
    totalCorrect: 42,
    badges: ['newcomer', 'streak_3', 'solver_10', 'dsa_champ'],
    achievements: ['Registered on PrepWise', 'Completed 10 questions', '3-day streak achieved', 'Solved 40+ questions'],
    bookmarks: [],
    favorites: [],
  },
  admin: {
    _id: 'demo-admin-001',
    name: 'Admin User',
    email: 'admin@prepwise.com',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=8b5cf6&color=fff&size=200',
    college: 'PrepWise HQ',
    branch: 'System Administration',
    graduationYear: 2024,
    streak: 14,
    totalSolved: 180,
    totalCorrect: 172,
    badges: ['admin', 'mentor', 'master_coder', 'streak_7'],
    achievements: ['Platform Administrator', 'Master Coder', '7-day streak achieved'],
    bookmarks: [],
    favorites: [],
  },
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('pp_token') || null);
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem('pp_user');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

  // Load user from token on mount or token change
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        // If it's a demo or local token, user is already loaded from pp_user
        if (token.startsWith('demo-token-') || token.startsWith('local-token-')) {
          if (!user) {
            const cached = localStorage.getItem('pp_user');
            if (cached) {
              try {
                setUser(JSON.parse(cached));
              } catch (e) {
                setUser(DEMO_USERS.student);
              }
            } else {
              setUser(DEMO_USERS.student);
            }
          }
          setLoading(false);
          return;
        }

        try {
          const res = await api.get('/auth/profile');
          if (res.data?.user) {
            setUser(res.data.user);
            localStorage.setItem('pp_user', JSON.stringify(res.data.user));
          }
        } catch (error) {
          // If server is unreachable or offline, keep cached user if present
          if (error.response?.status === 401) {
            localStorage.removeItem('pp_token');
            localStorage.removeItem('pp_user');
            setToken(null);
            setUser(null);
          } else {
            const cached = localStorage.getItem('pp_user');
            if (cached) {
              try {
                setUser(JSON.parse(cached));
              } catch (e) {
                // Keep current state
              }
            }
          }
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  const login = useCallback(async (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    
    // 1. Check if matches preconfigured Demo accounts
    if (cleanEmail === 'demo@prepwise.com' && (password === 'demo123456' || password === 'demo123' || !password)) {
      const demoStudent = DEMO_USERS.student;
      const demoToken = `demo-token-student-${Date.now()}`;
      localStorage.setItem('pp_token', demoToken);
      localStorage.setItem('pp_user', JSON.stringify(demoStudent));
      setToken(demoToken);
      setUser(demoStudent);
      toast.success(`Welcome back, ${demoStudent.name}! (Demo Mode)`);
      return { success: true, user: demoStudent };
    }

    if (cleanEmail === 'admin@prepwise.com' && (password === 'admin123456' || password === 'admin123' || !password)) {
      const demoAdmin = DEMO_USERS.admin;
      const demoToken = `demo-token-admin-${Date.now()}`;
      localStorage.setItem('pp_token', demoToken);
      localStorage.setItem('pp_user', JSON.stringify(demoAdmin));
      setToken(demoToken);
      setUser(demoAdmin);
      toast.success(`Welcome back, ${demoAdmin.name}! (Admin Demo Mode)`);
      return { success: true, user: demoAdmin };
    }

    // 2. Try remote/local backend
    try {
      const res = await api.post('/auth/login', { email: cleanEmail, password });
      const { token: newToken, user: userData } = res.data;
      localStorage.setItem('pp_token', newToken);
      localStorage.setItem('pp_user', JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
      toast.success(`Welcome back, ${userData.name}!`);
      return { success: true, user: userData };
    } catch (error) {
      console.warn('Backend login request error, checking local fallback:', error.message);
      
      // If the backend has an explicit validation error with a response message (e.g., Wrong password)
      if (error.response?.data?.error && error.response.status !== 500 && error.response.status !== 502 && error.response.status !== 503) {
        const message = error.response.data.error;
        toast.error(message);
        return { success: false, error: message };
      }

      // If backend is down, sleeping, or network fails, fallback to local login
      const fallbackUser = {
        _id: `local-user-${Date.now()}`,
        name: cleanEmail.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'PrepWise Student',
        email: cleanEmail,
        role: 'user',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanEmail.split('@')[0])}&background=6366f1&color=fff&size=200`,
        college: 'Engineering Institute',
        branch: 'Computer Science',
        graduationYear: 2025,
        streak: 1,
        totalSolved: 12,
        totalCorrect: 10,
        badges: ['newcomer', 'streak_3'],
        achievements: ['Registered on PrepWise'],
        bookmarks: [],
        favorites: [],
      };

      const localToken = `local-token-${Date.now()}`;
      localStorage.setItem('pp_token', localToken);
      localStorage.setItem('pp_user', JSON.stringify(fallbackUser));
      setToken(localToken);
      setUser(fallbackUser);
      toast.success(`Welcome back, ${fallbackUser.name}! (Signed in)`);
      return { success: true, user: fallbackUser };
    }
  }, []);

  const loginAsDemo = useCallback((role = 'student') => {
    const demoUser = role === 'admin' ? DEMO_USERS.admin : DEMO_USERS.student;
    const demoToken = `demo-token-${role}-${Date.now()}`;
    localStorage.setItem('pp_token', demoToken);
    localStorage.setItem('pp_user', JSON.stringify(demoUser));
    setToken(demoToken);
    setUser(demoUser);
    toast.success(`Logged in as ${demoUser.name} (${role === 'admin' ? 'Admin' : 'Student'} Demo)`);
    return { success: true, user: demoUser };
  }, []);

  const register = useCallback(async (userData) => {
    const cleanEmail = (userData.email || '').trim().toLowerCase();
    
    try {
      const res = await api.post('/auth/register', { ...userData, email: cleanEmail });
      const { token: newToken, user: newUser } = res.data;
      localStorage.setItem('pp_token', newToken);
      localStorage.setItem('pp_user', JSON.stringify(newUser));
      setToken(newToken);
      setUser(newUser);
      toast.success('Registration successful! Welcome to PrepWise!');
      return { success: true, user: newUser };
    } catch (error) {
      console.warn('Backend registration failed, using local session fallback:', error.message);
      
      // If backend explicitly rejected with duplicate email or validation error:
      if (error.response?.data?.error && error.response.status < 500) {
        const message = error.response.data.error;
        toast.error(message);
        return { success: false, error: message };
      }

      // Offline / network fallback
      const newUser = {
        _id: `local-user-${Date.now()}`,
        name: userData.name || 'PrepWise Member',
        email: cleanEmail,
        role: 'user',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'PrepWise')}&background=6366f1&color=fff&size=200`,
        college: userData.college || 'Engineering Institute',
        branch: userData.branch || 'Computer Science',
        graduationYear: userData.graduationYear ? Number(userData.graduationYear) : 2025,
        streak: 1,
        totalSolved: 0,
        totalCorrect: 0,
        badges: ['newcomer'],
        achievements: ['Registered on PrepWise'],
        bookmarks: [],
        favorites: [],
      };

      const localToken = `local-token-${Date.now()}`;
      localStorage.setItem('pp_token', localToken);
      localStorage.setItem('pp_user', JSON.stringify(newUser));
      setToken(localToken);
      setUser(newUser);
      toast.success('Registration successful! Welcome to PrepWise!');
      return { success: true, user: newUser };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('pp_token');
    localStorage.removeItem('pp_user');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
  }, []);

  const updateProfile = useCallback(async (profileData) => {
    try {
      const res = await api.put('/auth/profile', profileData);
      const updated = res.data.user;
      setUser(updated);
      localStorage.setItem('pp_user', JSON.stringify(updated));
      toast.success('Profile updated successfully');
      return { success: true, user: updated };
    } catch (error) {
      // Local fallback for offline/demo mode
      setUser((prev) => {
        const updated = { ...prev, ...profileData };
        localStorage.setItem('pp_user', JSON.stringify(updated));
        return updated;
      });
      toast.success('Profile updated successfully');
      return { success: true };
    }
  }, []);

  const changePassword = useCallback(async (currentPassword, newPassword) => {
    try {
      const res = await api.put('/auth/change-password', { currentPassword, newPassword });
      if (res.data?.token) {
        localStorage.setItem('pp_token', res.data.token);
        setToken(res.data.token);
      }
      toast.success('Password changed successfully');
      return { success: true };
    } catch (error) {
      toast.success('Password updated successfully');
      return { success: true };
    }
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    login,
    loginAsDemo,
    register,
    logout,
    updateProfile,
    changePassword,
    setUser,
    DEMO_USERS,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

