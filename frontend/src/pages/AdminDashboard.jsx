import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { CheckCircle, XCircle, Shield, Building2, User, Eye } from 'lucide-react';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('companies');
  
  // Mock Data
  const [pendingCompanies, setPendingCompanies] = useState([
    { id: 1, name: 'Innovate Tech', regNo: 'REG123456', type: 'IT', email: 'contact@innovate.com', status: 'pending' },
    { id: 2, name: 'BuildWell Constructions', regNo: 'REG789012', type: 'Manufacturing', email: 'hr@buildwell.com', status: 'pending' },
  ]);

  const [pendingStudents, setPendingStudents] = useState([
    { id: 101, name: 'Alice Smith', collegeId: 'CS2024001', branch: 'CSE', cgpa: 8.9, status: 'pending' },
    { id: 102, name: 'Bob Johnson', collegeId: 'ME2024045', branch: 'MECH', cgpa: 7.5, status: 'pending' },
  ]);

  const handleApprove = (id, type) => {
    if (type === 'company') {
      setPendingCompanies(prev => prev.filter(c => c.id !== id));
      // API call to approve would go here
      console.log(`Approved company ${id}`);
    } else {
      setPendingStudents(prev => prev.filter(s => s.id !== id));
      console.log(`Approved student ${id}`);
    }
  };

  const handleReject = (id, type) => {
    if (type === 'company') {
      setPendingCompanies(prev => prev.filter(c => c.id !== id));
      console.log(`Rejected company ${id}`);
    } else {
      setPendingStudents(prev => prev.filter(s => s.id !== id));
      console.log(`Rejected student ${id}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500">Manage system approvals and user access.</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Shield className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCompanies.length + pendingStudents.length}</div>
            <p className="text-xs text-slate-500">Action required</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building2 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-slate-500">Active on platform</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <User className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,432</div>
            <p className="text-xs text-slate-500">Registered this year</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Pending Approvals */}
      <div className="bg-white p-1 rounded-lg border inline-flex gap-1 mb-4">
        <button
          onClick={() => setActiveTab('companies')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'companies' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Pending Companies ({pendingCompanies.length})
        </button>
        <button
          onClick={() => setActiveTab('students')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'students' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Pending Students ({pendingStudents.length})
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {activeTab === 'companies' ? 'Company Registration Requests' : 'Student Profile Approvals'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeTab === 'companies' && (
              pendingCompanies.length === 0 ? (
                <p className="text-slate-500 text-center py-4">No pending company approvals.</p>
              ) : (
                pendingCompanies.map(company => (
                  <div key={company.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg gap-4">
                    <div>
                      <h4 className="font-semibold text-lg">{company.name}</h4>
                      <div className="text-sm text-slate-500 grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                        <span>Reg No: {company.regNo}</span>
                        <span>Type: {company.type}</span>
                        <span>Email: {company.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                        <Eye className="h-4 w-4 mr-2" /> View Docs
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 flex-1 md:flex-none"
                        onClick={() => handleApprove(company.id, 'company')}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" /> Approve
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="flex-1 md:flex-none"
                        onClick={() => handleReject(company.id, 'company')}
                      >
                        <XCircle className="h-4 w-4 mr-2" /> Reject
                      </Button>
                    </div>
                  </div>
                ))
              )
            )}

            {activeTab === 'students' && (
              pendingStudents.length === 0 ? (
                <p className="text-slate-500 text-center py-4">No pending student approvals.</p>
              ) : (
                pendingStudents.map(student => (
                  <div key={student.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg gap-4">
                    <div>
                      <h4 className="font-semibold text-lg">{student.name}</h4>
                      <div className="text-sm text-slate-500 grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                        <span>ID: {student.collegeId}</span>
                        <span>Branch: {student.branch}</span>
                        <span>CGPA: {student.cgpa}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                        View Profile
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 flex-1 md:flex-none"
                        onClick={() => handleApprove(student.id, 'student')}
                      >
                        Approve
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="flex-1 md:flex-none"
                        onClick={() => handleReject(student.id, 'student')}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
