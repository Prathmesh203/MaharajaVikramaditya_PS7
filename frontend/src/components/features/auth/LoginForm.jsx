import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { Label } from '../../common/Label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../common/Card';
import { AlertCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(null);
  
  const { login } = useAuth();
  const location = useLocation();
  const message = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Rate Limiting Check
    if (lockedUntil && Date.now() < lockedUntil) {
      setError(`Too many attempts. Please try again in ${Math.ceil((lockedUntil - Date.now()) / 60000)} minutes.`);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
    } catch (err) {
      console.error(err);
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 5) {
        const lockTime = Date.now() + 15 * 60 * 1000; // 15 minutes
        setLockedUntil(lockTime);
        setError('Account temporarily locked due to multiple failed attempts. Try again in 15 minutes.');
      } else {
        setError('Invalid email or password.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Login to access your dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        {message && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-md flex items-center gap-2">
             <AlertCircle className="h-4 w-4" />
             {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={!!lockedUntil}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={!!lockedUntil}
            />
          </div>
          <Button type="submit" className="w-full" isLoading={isLoading} disabled={!!lockedUntil}>
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
