import { useState } from 'react';

import TaskForm from './TaskForm';

import { useTask } from '../../context/TaskContext';
import TaskTimeline from './TaskTimeline';
import { formatDate, isOverdue } from '../../utils/dataUtils';

export default function TaskCard({ task }) {
  const { removeTask, moveTask } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  
  const [showTimeline, setShowTimeline] = useState(false); 
  
  const slaBreached = isOverdue(task.slaDeadline, task.status);

  return (
    <>
      <div className={`p-4 rounded-lg shadow border-l-4 bg-white hover:shadow-lg transition-all relative group flex flex-col justify-between h-full ${slaBreached ? 'border-red-500' : 'border-blue-500'}`}>
        
        <div>
          <h3 className="font-semibold text-lg pr-20 text-gray-800">{task.title}</h3>
          <p className="text-gray-600 text-sm mt-2">{task.description}</p>
        </div>
        
        <div className="mt-5 flex justify-between items-center text-xs">
          <span className={`px-2 py-1 rounded font-medium ${slaBreached ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
            SLA: {formatDate(task.slaDeadline)}
          </span>

          <select 
            value={task.status}
            onChange={(e) => moveTask(task._id, e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 bg-gray-50 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="TODO">To Do</option>
            <option value="IN_PROCESS">In Process</option>
            <option value="DONE">Done</option>
          </select>
        </div>

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-3 bg-white pl-2 rounded-l">
          
          <button onClick={() => setShowTimeline(true)} className="text-purple-600 hover:text-purple-800 font-semibold" title="View Timeline">
            SLR TimeLine
          </button>
          
          <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:text-blue-800 font-semibold" title="Edit Task">
            Edit
          </button>
          
          <button onClick={() => removeTask(task._id)} className="text-red-600 hover:text-red-800 font-semibold" title="Delete Task">
            Delete
          </button>
        </div>
      </div>

      {isEditing && <TaskForm onClose={() => setIsEditing(false)} taskToEdit={task} />}
      
      {showTimeline && <TaskTimeline onClose={() => setShowTimeline(false)} task={task} />}
    </>
  );
}