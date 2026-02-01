import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ReadinessCard } from '../components/features/dashboard/ReadinessCard';
import { EligibilityCard } from '../components/features/dashboard/EligibilityCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { User, BookOpen, Award } from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();

  // Mock Data - In production this comes from API
  const mockReadiness = {
    score: user?.readinessScore || 78,
    gaps: [
      "Improve Data Structures & Algorithms proficiency",
      "Complete 2 more mock interviews",
      "Update GitHub portfolio with recent projects"
    ]
  };

  const mockEligibleDrives = [
    {
      id: 1,
      company: "TechCorp Inc.",
      role: "Software Engineer I",
      package: "12-15 LPA",
      trustScore: 92,
      deadline: "2024-03-20"
    },
    {
      id: 2,
      company: "Innovate Solutions",
      role: "Frontend Developer",
      package: "8-10 LPA",
      trustScore: 88,
      deadline: "2024-03-22"
    },
    {
      id: 3,
      company: "DataSystems",
      role: "Data Analyst",
      package: "9-11 LPA",
      trustScore: 85,
      deadline: "2024-03-25"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Welcome back, {user?.name || 'Student'}. Here's your placement overview.</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Academic CGPA</CardTitle>
            <BookOpen className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.cgpa || '8.5'}</div>
            <p className="text-xs text-slate-500">Verified by Admin</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
            <User className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-slate-500">2 In Progress, 1 Shortlisted</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <Award className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-slate-500">Latest: "React Pro"</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <EligibilityCard eligibleDrives={mockEligibleDrives} />
        </div>
        <div className="col-span-3">
          <ReadinessCard score={mockReadiness.score} gaps={mockReadiness.gaps} />
        </div>
      </div>
    </div>
  );
}
