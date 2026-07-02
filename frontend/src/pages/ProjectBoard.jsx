import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client';
import { Plus } from 'lucide-react';

const ProjectBoard = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const { data } = await api.get(`/tasks/project/${id}`);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [id]);

  const updateTaskStatus = async (taskId, status) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, { status });
      fetchTasks();
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  if (loading) return <div className="text-center py-10">Loading board...</div>;

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100 border-gray-200 text-gray-700' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-50 border-blue-100 text-blue-700' },
    { id: 'done', title: 'Done', color: 'bg-green-50 border-green-100 text-green-700' }
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Board</h1>
        </div>
        <button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center shadow-sm transition-colors">
          <Plus size={16} className="mr-2" />
          Add Task
        </button>
      </header>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {columns.map(col => (
          <div key={col.id} className="min-w-[320px] w-full max-w-sm flex flex-col">
            <div className={`px-4 py-3 rounded-t-xl border-t border-l border-r font-medium flex justify-between items-center ${col.color}`}>
              <span>{col.title}</span>
              <span className="bg-white bg-opacity-50 text-xs px-2 py-1 rounded-full">
                {tasks.filter(t => t.status === col.id).length}
              </span>
            </div>
            
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-b-xl p-3 flex flex-col gap-3 overflow-y-auto">
              {tasks.filter(t => t.status === col.id).map(task => (
                <div key={task._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                      task.priority === 'high' ? 'bg-red-50 text-red-600' :
                      task.priority === 'medium' ? 'bg-amber-50 text-amber-600' :
                      'bg-green-50 text-green-600'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900 leading-snug">{task.title}</h4>
                  {task.description && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{task.description}</p>
                  )}
                  
                  <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {task.assignee ? (
                        <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-xs font-bold border-2 border-white" title={task.assignee.name}>
                          {task.assignee.name.charAt(0)}
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-xs border-2 border-white">
                          ?
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-1">
                      {columns.filter(c => c.id !== task.status).map(c => (
                        <button
                          key={c.id}
                          onClick={() => updateTaskStatus(task._id, c.id)}
                          className="text-[10px] px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                        >
                          → {c.title.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectBoard;
