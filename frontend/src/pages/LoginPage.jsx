import React from 'react';
import { LoginForm } from '../components/features/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="container max-w-screen-xl py-12 flex justify-center items-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Sign In</h1>
          <p className="text-slate-500 mt-2">Access your dashboard</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
