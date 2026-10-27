import { msToReadableTime } from "../../utils/dataUtils";


export default function AnalyticsBanner({ tasks }) {
  const doneTasks = tasks.filter(t => t.status === 'DONE').length;
  const totalTasks = tasks.length;

  let totalTodoTime = 0;
  let totalProcessTime = 0;

  tasks.forEach(task => {
    totalTodoTime += (task.timeInTodo || 0);
    totalProcessTime += (task.timeInProcess || 0);
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
        <h4 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Tasks Completed</h4>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-green-600">{doneTasks}</span>
          <span className="text-gray-400 font-medium">/ {totalTasks}</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
        <h4 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Time Spent in To-Do</h4>
        <span className="text-3xl font-extrabold text-blue-600">
          {msToReadableTime(totalTodoTime)}
        </span>
        <p className="text-xs text-gray-400 mt-2">Before starting work</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
        <h4 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Time in Progress</h4>
        <span className="text-3xl font-extrabold text-purple-600">
          {msToReadableTime(totalProcessTime)}
        </span>
        <p className="text-xs text-gray-400 mt-2">Actual working time</p>
      </div>

    </div>
  );
}