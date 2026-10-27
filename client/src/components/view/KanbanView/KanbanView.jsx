import { useTask } from '../../../context/TaskContext';
import TaskCard from '../../tasks/TaskCard';

const columns = [
  { id: 'TODO', title: 'To Do' },
  { id: 'IN_PROCESS', title: 'In Process' },
  { id: 'DONE', title: 'Done' }
];

export default function KanbanView({ tasks }) {
  const { moveTask } = useTask();

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = (e, status) => {
    const taskId = e.dataTransfer.getData('taskId');
    moveTask(taskId, status);
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {columns.map(col => (
        <div 
          key={col.id} 
          className="bg-gray-100 rounded-lg p-4 min-h-[500px]"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, col.id)}
        >
          <h2 className="font-bold text-gray-700 mb-4">{col.title}</h2>
          <div className="flex flex-col gap-3">
            {tasks.filter(t => t.status === col.id).map(task => (
              <div 
                key={task._id} 
                draggable 
                onDragStart={(e) => handleDragStart(e, task._id)}
                className="cursor-grab active:cursor-grabbing"
              >
                <TaskCard task={task} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}