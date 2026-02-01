import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { CheckCircle2, XCircle, BarChart3 } from 'lucide-react';

export default function ResultsPage() {
  const location = useLocation();
  const { score } = location.state || { score: 0 }; // Fallback if accessed directly

  return (
    <div className="container max-w-screen-md mx-auto py-12">
      <Card className="text-center overflow-hidden">
        <div className="bg-slate-900 text-white p-8">
          <h1 className="text-3xl font-bold mb-2">Test Completed</h1>
          <p className="text-slate-300">Your responses have been recorded successfully.</p>
        </div>
        <CardContent className="pt-8 pb-8 space-y-8">
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-40 w-40 flex items-center justify-center rounded-full border-8 border-slate-100 mb-4">
              <div className="text-center">
                <span className="text-5xl font-bold text-slate-900">{score}</span>
                <span className="text-slate-400 block text-sm font-medium uppercase tracking-wide">Score</span>
              </div>
            </div>
            
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium ${score >= 70 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {score >= 70 ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
              {score >= 70 ? 'Qualified for Interview' : 'Needs Improvement'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-500 mb-1">Accuracy</div>
              <div className="text-xl font-bold text-slate-900">85%</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-500 mb-1">Time Taken</div>
              <div className="text-xl font-bold text-slate-900">14m 20s</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-500 mb-1">Percentile</div>
              <div className="text-xl font-bold text-slate-900">Top 10%</div>
            </div>
          </div>

          <div className="border-t pt-8">
            <h3 className="font-semibold text-lg mb-4 flex items-center justify-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Detailed Analysis
            </h3>
            <div className="space-y-4 max-w-md mx-auto">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Core Concepts</span>
                  <span className="font-medium">90%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[90%]"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Problem Solving</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[75%]"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Code Quality</span>
                  <span className="font-medium">60%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 w-[60%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Link to="/student/dashboard">
              <Button size="lg" className="w-full md:w-auto">Return to Dashboard</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
