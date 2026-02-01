import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Search, MapPin, Briefcase } from 'lucide-react';

export default function StudentHome() {
  const [searchTerm, setSearchTerm] = useState('');

  const companies = [
    { id: 1, name: 'TechCorp Inc.', location: 'Bangalore', roles: ['Software Engineer', 'Data Analyst'], description: 'Leading tech solutions provider.' },
    { id: 2, name: 'Innovate Solutions', location: 'Hyderabad', roles: ['Frontend Dev', 'UX Designer'], description: 'Innovation driven startup.' },
    { id: 3, name: 'DataSystems', location: 'Pune', roles: ['Backend Dev', 'DevOps'], description: 'Enterprise data management.' },
  ];

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.roles.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Registered Companies</h1>
          <p className="text-slate-500">Explore potential employers and opportunities.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search companies or roles..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCompanies.map(company => (
          <Card key={company.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{company.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-slate-600 line-clamp-2">{company.description}</p>
                
                <div className="flex items-center text-sm text-slate-500 gap-2">
                  <MapPin className="h-4 w-4" />
                  {company.location}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                    <Briefcase className="h-4 w-4" />
                    Open Roles:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {company.roles.map((role, idx) => (
                      <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-2">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
