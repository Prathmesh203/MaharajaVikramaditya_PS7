import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../common/Card';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export function ReadinessCard({ score, gaps }) {
  const getScoreColor = (s) => {
    if (s >= 80) return 'text-green-600';
    if (s >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Placement Readiness
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-500">Overall Score</span>
          <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}/100</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2.5 mb-6">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${score}%` }}
          ></div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm text-slate-900">Skill Gap Insights</h4>
          {gaps.length === 0 ? (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span>You are fully ready!</span>
            </div>
          ) : (
            gaps.map((gap, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                <span>{gap}</span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
