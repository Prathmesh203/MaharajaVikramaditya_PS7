import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { TrustScoreCard } from '../components/features/dashboard/TrustScoreCard';
import { Plus, Users, Briefcase, FileText } from 'lucide-react';

export default function CompanyDashboard() {
  const { user } = useAuth();

  const mockPostings = [
    { id: 1, title: "Software Engineer I", applicants: 142, status: "Active" },
    { id: 2, title: "Data Analyst Intern", applicants: 89, status: "Interviewing" },
    { id: 3, title: "Product Manager", applicants: 45, status: "Closed" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Recruiter Dashboard</h1>
          <p className="text-slate-500">Manage your campus drives and view applicants.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Post New Opportunity
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">276</div>
            <p className="text-xs text-slate-500">+12% from last drive</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Briefcase className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-slate-500">1 closing soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers Rolled Out</CardTitle>
            <FileText className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-slate-500">Pending acceptance: 4</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Job Postings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPostings.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{job.title}</h4>
                      <p className="text-sm text-slate-500">{job.applicants} Applicants</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        job.status === 'Active' ? 'bg-green-100 text-green-700' :
                        job.status === 'Interviewing' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {job.status}
                      </span>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-3">
          <TrustScoreCard score={user?.trustScore || 92} />
        </div>
      </div>
    </div>
  );
}
