import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/client';
import { Link } from 'react-router-dom';
import { Briefcase, CheckCircle2, Clock, ListTodo } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [organizations, setOrganizations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const orgRes = await api.get('/organizations');
        setOrganizations(orgRes.data);

        // Fetch projects for the first organization as an example
        if (orgRes.data.length > 0) {
          const projRes = await api.get(`/projects/org/${orgRes.data[0]._id}`);
          setProjects(projRes.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <div className="text-center py-10 text-gray-500">Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, {user?.name}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Projects</p>
            <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
            <ListTodo size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">To Do</p>
            <p className="text-2xl font-bold text-gray-900">-</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">In Progress</p>
            <p className="text-2xl font-bold text-gray-900">-</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Done</p>
            <p className="text-2xl font-bold text-gray-900">-</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Your Projects</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {projects.length === 0 ? (
                <div className="p-6 text-center text-gray-500">No projects found.</div>
              ) : (
                projects.map(project => (
                  <Link 
                    to={`/project/${project._id}`} 
                    key={project._id}
                    className="block p-6 hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Organizations</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {organizations.length === 0 ? (
                <div className="p-6 text-center text-gray-500">No organizations found.</div>
              ) : (
                organizations.map(org => (
                  <div key={org._id} className="p-4">
                    <h3 className="font-medium text-gray-900">{org.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{org.members.length} members</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
