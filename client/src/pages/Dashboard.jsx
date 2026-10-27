import { useState, useEffect } from 'react';
import { useTask } from '../context/TaskContext'; 
import Navbar from '../components/common/Navbar';

import TaskForm from '../components/tasks/TaskForm';
import KanbanView from '../components/view/KanbanView/KanbanView';
import ListView from '../components/view/ListView/ListView';
import GridView from '../components/view/GridView/GridView';
import AnalyticsBanner from '../components/common/AnalyticsBanner';

export default function Dashboard() {
  const { tasks, loadTasks } = useTask();
  const [view, setView] = useState('kanban'); 
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadTasks(search);
  }, [search]);

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        <AnalyticsBanner tasks={tasks} />
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-6">
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-1/3 focus:outline-none focus:border-blue-500"
          />
          <div className="flex gap-4">
            <select value={view} onChange={(e) => setView(e.target.value)} className="border p-2 rounded bg-white focus:outline-none">
              <option value="kanban">Kanban View</option>
              <option value="list">List View</option>
              <option value="grid">Grid View</option>
            </select>
            <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              + New Task
            </button>
          </div>
        </div>

        {/* Dynamic View Render */}
        {view === 'kanban' && <KanbanView tasks={tasks} />}
        {view === 'list' && <ListView tasks={tasks} />}
        {view === 'grid' && <GridView tasks={tasks} />}

        {showForm && <TaskForm onClose={() => setShowForm(false)} />}
      </div>
    </div>
  );
}