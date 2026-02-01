import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Admin Pages
import { AdminDashboard } from './pages/AdminDashboard';

// Company Pages
import CompanyDashboard from './pages/CompanyDashboard';

// Student Pages
import StudentDashboard from './pages/StudentDashboard'; // Keeping legacy dash as "Overview" or similar if needed, but routing new pages
import StudentHome from './pages/student/StudentHome';
import StudentProfile from './pages/student/StudentProfile';
import StudentApply from './pages/student/StudentApply';

// Test Pages
import TestInterface from './pages/TestInterface';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin Routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Company Routes */}
        <Route 
          path="/company/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['company']} requireApproval={true}>
              <CompanyDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Student Routes */}
        {/* Student Dashboard Wrapper could be added here if side-nav is needed */}
        <Route 
          path="/student/dashboard" 
          element={<Navigate to="/student/home" replace />} 
        />
        
        <Route 
          path="/student/home" 
          element={
            <ProtectedRoute allowedRoles={['student']} requireApproval={true}>
              <StudentHome />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/student/profile" 
          element={
            <ProtectedRoute allowedRoles={['student']} requireApproval={false}> 
              {/* Profile is accessible even if unapproved */}
              <StudentProfile />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/student/apply" 
          element={
            <ProtectedRoute allowedRoles={['student']} requireApproval={false}>
              {/* Apply page handles its own "Pending" state UI internally as requested */}
              <StudentApply />
            </ProtectedRoute>
          } 
        />

        {/* Test Routes */}
        <Route 
          path="/test" 
          element={
            <ProtectedRoute allowedRoles={['student']} requireApproval={true}>
              <TestInterface />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/results" 
          element={
            <ProtectedRoute allowedRoles={['student']} requireApproval={true}>
              <ResultsPage />
            </ProtectedRoute>
          } 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
