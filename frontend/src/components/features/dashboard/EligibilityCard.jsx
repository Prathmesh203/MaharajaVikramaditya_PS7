import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../common/Card';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Button } from '../../common/Button';
import { Link } from 'react-router-dom';

export function EligibilityCard({ eligibleDrives }) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Eligible Drives</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {eligibleDrives.map((drive) => (
            <div key={drive.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors">
              <div>
                <h4 className="font-semibold text-slate-900">{drive.company}</h4>
                <p className="text-sm text-slate-500">{drive.role} • {drive.package}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Eligible
                  </span>
                  <span className="text-xs text-slate-400">Trust Score: {drive.trustScore}%</span>
                </div>
              </div>
              <Link to="/test">
                <Button size="sm" variant="outline">Take Test</Button>
              </Link>
            </div>
          ))}
          {eligibleDrives.length === 0 && (
            <p className="text-center text-slate-500 py-4">No eligible drives found based on your current profile.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
