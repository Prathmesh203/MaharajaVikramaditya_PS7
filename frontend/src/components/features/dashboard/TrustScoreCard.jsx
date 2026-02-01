import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../common/Card';
import { ShieldCheck, Star } from 'lucide-react';

export function TrustScoreCard({ score, history }) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-purple-600" />
          Company Trust Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-500">Reputation Index</span>
          <span className="text-3xl font-bold text-purple-600">{score}%</span>
        </div>
        
        <div className="w-full bg-slate-100 rounded-full h-2.5 mb-6">
          <div 
            className="bg-purple-600 h-2.5 rounded-full" 
            style={{ width: `${score}%` }}
          ></div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-sm text-slate-900">Score Factors</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Offer Rollout Rate</span>
              <span className="font-medium text-slate-900">98%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Student Feedback</span>
              <div className="flex text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4" />
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Retention (1 Year)</span>
              <span className="font-medium text-slate-900">High</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
