import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [sessionTimer, setSessionTimer] = useState(null);

  // Reset session timer on user activity
  const resetSessionTimer = useCallback(() => {
    if (sessionTimer) clearTimeout(sessionTimer);
    if (user) {
      const timer = setTimeout(() => {
        console.log('Session timed out');
        logout();
      }, SESSION_TIMEOUT);
      setSessionTimer(timer);
    }
  }, [user]);

  useEffect(() => {
    window.addEventListener('mousemove', resetSessionTimer);
    window.addEventListener('keypress', resetSessionTimer);
    return () => {
      window.removeEventListener('mousemove', resetSessionTimer);
      window.removeEventListener('keypress', resetSessionTimer);
      if (sessionTimer) clearTimeout(sessionTimer);
    };
  }, [resetSessionTimer]);

  const login = async (email, password) => {
    console.log(`Attempting login with ${email}`);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let role = 'student';
        let name = 'Student User';
        let status = 'approved'; // pending | approved | rejected
        let mockData = {};

        // Mock Logic based on email pattern
        if (email === 'admin@campushire.com' && password === 'admin123') {
          role = 'admin';
          name = 'System Administrator';
          status = 'approved';
        } else if (email.includes('admin')) {
             // Fallback for easy testing
             role = 'admin';
             name = 'Admin User';
             status = 'approved';
        } else if (email.includes('company')) {
          role = 'company';
          name = 'Tech Corp';
          // Make company pending if email contains 'pending'
          status = email.includes('pending') ? 'pending' : 'approved';
          mockData = { trustScore: 85 };
        } else {
          // Student
          role = 'student';
          name = 'Student User';
          // Make student pending if email contains 'pending'
          status = email.includes('pending') ? 'pending' : 'approved';
          mockData = { cgpa: 8.5, readinessScore: 72, profileCompleted: false };
        }

        const userData = {
          id: Date.now().toString(),
          name,
          email,
          role,
          status,
          ...mockData
        };

        setUser(userData);
        console.log('Login successful:', userData);
        
        // Initial Redirection Logic handled by ProtectedRoute, 
        // but we can help steer them to the right landing page here too.
        if (role === 'admin') navigate('/admin/dashboard');
        else if (role === 'company') navigate('/company/dashboard');
        else navigate('/student/home'); // Student Home as per requirements
        
        resolve(userData);
      }, 1000);
    });
  };

  const register = async (data) => {
    console.log('Registering User (JSON Payload):');
    console.log(JSON.stringify(data, null, 2));
    
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.role === 'student') {
             // Automatic approval for students (as per previous requirement), 
             // but current req says "Restrict student dashboard... until admin approves".
             // Let's assume 'pending' by default for new registrations if admin approval is strictly required.
             // However, the prompt says "Implement automatic approval for student accounts" in the previous turn,
             // BUT "Restrict student dashboard access... until admin approves" in the CURRENT turn.
             // I will prioritize the CURRENT turn's requirement for stricter control.
             // So, new students are 'pending'.
             
             const userData = {
                id: Date.now().toString(),
                name: data.fullName,
                email: data.email,
                role: 'student',
                status: 'pending', // Pending admin approval
                cgpa: data.cgpa || 0,
                readinessScore: 50,
                profileCompleted: true // Assuming reg form fills minimal profile
             };
             setUser(userData);
             navigate('/student/profile'); // Send to profile or home
        } else {
            // Company - pending approval
            navigate('/login', { state: { message: 'Registration successful! Please wait for admin approval.' } });
        }
        resolve({ success: true });
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    if (sessionTimer) clearTimeout(sessionTimer);
    navigate('/login');
  };

  // Helper to update user data (e.g. after profile update)
  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
