import { formatDate, isOverdue } from "../../../utils/dataUtils";


export default function ListView({ tasks }) {
  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4">Task</th>
            <th className="p-4">Status</th>
            <th className="p-4">Deadline (SLA)</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => {
            const breached = isOverdue(task.slaDeadline, task.status);
            return (
              <tr key={task._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{task.title}</td>
                <td className="p-4"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{task.status}</span></td>
                <td className={`p-4 ${breached ? 'text-red-600 font-bold' : ''}`}>{formatDate(task.slaDeadline)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}