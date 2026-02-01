import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';

export function ProtectedRoute({ children, allowedRoles, requireApproval = true }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role Check
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (user.role === 'company') return <Navigate to="/company/dashboard" replace />;
    if (user.role === 'student') return <Navigate to="/student/home" replace />;
    return <Navigate to="/" replace />;
  }

  // Approval Check
  if (requireApproval && user.status !== 'approved') {
    // Special handling for students: Unapproved students can access Profile
    if (user.role === 'student' && location.pathname.includes('/profile')) {
       return children;
    }

    // Unapproved students redirected to profile if they try to access other protected routes
    if (user.role === 'student') {
        return <Navigate to="/student/profile" replace />;
    }

    // For companies or others, show Pending Approval Screen
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-yellow-50 p-6 rounded-full mb-6">
          <AlertCircle className="h-12 w-12 text-yellow-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Account Pending Approval</h2>
        <p className="text-slate-600 max-w-md mb-8">
          Your account is currently under review by our administration team. 
          You will receive an email notification once your profile has been verified and approved.
        </p>
        <Button onClick={() => window.location.href = '/'}>Return to Home</Button>
      </div>
    );
  }

  return children;
}
