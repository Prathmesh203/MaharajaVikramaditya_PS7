import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';

export default function StudentApply() {
  const { user } = useAuth();
  const isApproved = user?.status === 'approved';

  if (!isApproved) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
        <div className="bg-yellow-50 p-6 rounded-full">
          <AlertCircle className="h-16 w-16 text-yellow-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Awaiting Admin Approval</h2>
          <p className="text-slate-500 mt-2 max-w-md mx-auto">
            You cannot apply for jobs until your profile has been verified and approved by the administration team.
            Please ensure your profile details are complete.
          </p>
        </div>
        <Button onClick={() => window.location.href = '/student/profile'}>Complete Profile</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Job Applications</h1>
          <p className="text-slate-500">Track and manage your applications.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Open Applications</CardTitle>
        </CardHeader>
        <CardContent>
           <div className="text-center py-12 text-slate-500">
             <p>No active applications found. Visit the Home page to find opportunities.</p>
             <Button className="mt-4" onClick={() => window.location.href = '/student/home'}>Browse Jobs</Button>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
