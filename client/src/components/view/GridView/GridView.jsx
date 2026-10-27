import TaskCard from '../../tasks/TaskCard';

export default function GridView({ tasks }) {
  if (tasks.length === 0) {
    return <div className="text-center text-gray-500 mt-10">No tasks found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map(task => (
        <div key={task._id} className="h-full">
          <TaskCard task={task} />
        </div>
      ))}
    </div>
  );
}
