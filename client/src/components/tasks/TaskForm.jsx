import { useState } from 'react';
import { useTask } from '../../context/TaskContext';

export default function TaskForm({ onClose }) {
  const { addTask } = useTask();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [slaDeadline, setSlaDeadline] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTask({ title, description, slaDeadline });
      onClose(); 
    } catch (error) {
      alert('Error creating task');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Task</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 font-bold text-xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full border p-2 rounded" 
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="w-full border p-2 rounded h-24" 
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">SLA Deadline</label>
            <input 
              type="datetime-local" 
              value={slaDeadline} 
              onChange={(e) => setSlaDeadline(e.target.value)} 
              className="w-full border p-2 rounded" 
              required 
            />
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}