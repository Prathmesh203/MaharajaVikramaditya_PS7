import React from 'react';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';
import { CheckCircle2, TrendingUp, ShieldCheck, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-16 py-8 md:py-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
          Bridge the Gap Between <span className="text-blue-600">Talent</span> and <span className="text-blue-600">Opportunity</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Automated eligibility verification, skill-based qualification, and transparent hiring for modern campuses.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link to="/register">
            <Button size="lg" className="h-12 px-8 text-lg">Get Started</Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="h-12 px-8 text-lg">Login</Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard 
          icon={<CheckCircle2 className="h-8 w-8 text-green-500" />}
          title="Automated Verification"
          description="Instant academic eligibility checks against company criteria."
        />
        <FeatureCard 
          icon={<TrendingUp className="h-8 w-8 text-blue-500" />}
          title="Readiness Metrics"
          description="Real-time student readiness scores and skill gap analysis."
        />
        <FeatureCard 
          icon={<ShieldCheck className="h-8 w-8 text-purple-500" />}
          title="Trust Scores"
          description="Transparent company ratings based on placement history."
        />
        <FeatureCard 
          icon={<Users className="h-8 w-8 text-orange-500" />}
          title="Fair Hiring"
          description="Bias-free qualification tests and transparent results."
        />
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="mb-4 bg-slate-50 w-fit p-3 rounded-lg">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  );
}
