import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { applicationService } from '../../services/api';
import { 
  Users, Search, Filter, Download, CheckCircle, XCircle, 
  Clock, Award, FileText, ChevronLeft, Loader 
} from 'lucide-react';

const DriveApplicants = () => {
  const { driveId } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedApp, setSelectedApp] = useState(null); // For viewing/grading
  const [scoreInput, setScoreInput] = useState('');

  useEffect(() => {
    fetchApplicants();
  }, [driveId]);

  const fetchApplicants = async () => {
    try {
      const response = await applicationService.getDriveApplications(driveId);
      setApplicants(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load applicants');
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await applicationService.updateStatus(applicationId, newStatus);
      // Optimistic update
      setApplicants(applicants.map(app => 
        app._id === applicationId ? { ...app, status: newStatus } : app
      ));
      if (selectedApp?._id === applicationId) {
        setSelectedApp(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleScoreUpdate = async () => {
    if (!selectedApp || !scoreInput) return;
    try {
        await applicationService.updateStatus(selectedApp._id, undefined, Number(scoreInput));
        // Update local state
        setApplicants(applicants.map(app => 
            app._id === selectedApp._id ? { ...app, testScore: Number(scoreInput) } : app
        ));
        setSelectedApp(prev => ({ ...prev, testScore: Number(scoreInput) }));
        setScoreInput('');
        alert("Score updated");
    } catch (err) {
        alert("Failed to update score");
    }
  };

  const openReviewModal = (app) => {
    setSelectedApp(app);
    setScoreInput(app.testScore || '');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'selected': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'shortlisted': return 'bg-blue-100 text-blue-800';
      case 'interview': return 'bg-purple-100 text-purple-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const filteredApplicants = applicants.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch = app.studentId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.studentId?.collegeId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader className="w-8 h-8 animate-spin text-blue-600" />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/company/drives')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Applicants</h1>
          <p className="text-gray-600">Review and track candidate applications</p>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interview">Interview</option>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Users className="w-4 h-4" />
          <span>Total: {applicants.length}</span>
          <span className="mx-2">|</span>
          <span>Showing: {filteredApplicants.length}</span>
        </div>
      </div>

      {/* Applicants Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Candidate</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Academic Info</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Applied Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredApplicants.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {app.studentId?.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{app.studentId?.name || 'Unknown'}</div>
                        <div className="text-sm text-gray-500">{app.studentId?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{app.studentId?.branch}</div>
                    <div className="text-sm text-gray-500">CGPA: {app.studentId?.cgpa}</div>
                    <div className="text-xs text-gray-400 mt-1">{app.studentId?.collegeId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {app.studentId?.resume && (
                        <a 
                          href={app.studentId.resume} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-1.5 hover:bg-gray-100 rounded text-gray-600 hover:text-blue-600"
                          title="View Resume"
                        >
                          <FileText className="w-4 h-4" />
                        </a>
                      )}
                      
                      <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <button
                          onClick={() => handleStatusUpdate(app._id, 'shortlisted')}
                          className="p-1.5 hover:bg-white rounded shadow-sm hover:text-blue-600 transition-all"
                          title="Shortlist"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(app._id, 'rejected')}
                          className="p-1.5 hover:bg-white rounded shadow-sm hover:text-red-600 transition-all"
                          title="Reject"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(app._id, 'selected')}
                          className="p-1.5 hover:bg-white rounded shadow-sm hover:text-green-600 transition-all"
                          title="Select/Hire"
                        >
                          <Award className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredApplicants.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    No applicants found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <div>
                <h2 className="text-xl font-bold">Review Application</h2>
                <p className="text-slate-500">{selectedApp.studentId.name}</p>
              </div>
              <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {selectedApp.testAnswers && selectedApp.testAnswers.length > 0 ? (
                    <div className="space-y-6">
                        <h3 className="font-semibold text-lg border-b pb-2">Test Answers</h3>
                        {selectedApp.testAnswers.map((ans, idx) => (
                            <div key={idx} className="bg-slate-50 p-4 rounded-lg">
                                <p className="font-medium text-slate-900 mb-2">Q: {ans.question || 'Question text unavailable'}</p>
                                <div className="bg-white p-3 rounded border text-slate-700 whitespace-pre-wrap">
                                    {ans.answer}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg">
                        No test answers submitted.
                    </div>
                )}

                <div className="flex items-center gap-4 border-t pt-6">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Score / Grading</label>
                        <div className="flex gap-2">
                            <input 
                                type="number" 
                                placeholder="Enter score" 
                                value={scoreInput}
                                onChange={(e) => setScoreInput(e.target.value)}
                                className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <Button onClick={handleScoreUpdate} size="sm">Save Score</Button>
                        </div>
                    </div>
                    <div className="flex gap-2 self-end">
                        <Button 
                            variant="outline" 
                            className="text-red-600 hover:bg-red-50 border-red-200"
                            onClick={() => handleStatusUpdate(selectedApp._id, 'rejected')}
                        >
                            Reject
                        </Button>
                        <Button 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleStatusUpdate(selectedApp._id, 'shortlisted')}
                        >
                            Shortlist
                        </Button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriveApplicants;
