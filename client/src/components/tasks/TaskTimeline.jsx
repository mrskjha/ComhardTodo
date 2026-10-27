import { useState, useEffect } from 'react';
import { fetchTaskTimeline } from '../../api/taskApi';
import { formatDate, msToReadableTime } from '../../utils/dataUtils';


export default function TaskTimeline({ task, onClose }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTimeline = async () => {
      try {
        const data = await fetchTaskTimeline(task._id);
        setHistory(data);
      } catch (error) {
        console.error("Timeline error", error);
      }
      setLoading(false);
    };
    getTimeline();
  }, [task._id]);

  const renderTimelineEvents = () => {
    let events = [{
      status: 'TODO',
      action: 'Task Created',
      time: new Date(task.createdAt),
      durationStr: null
    }];

    history.forEach((log, index) => {
      const prevTime = events[events.length - 1].time;
      const currTime = new Date(log.changedAt);
      const diffMs = currTime - prevTime; 

      events[events.length - 1].durationStr = msToReadableTime(diffMs);

      events.push({
        status: log.newStatus,
        action: `Moved to ${log.newStatus.replace('_', ' ')}`,
        by: log.changedBy?.name,
        time: currTime,
        durationStr: null 
      });
    });

    if (events[events.length - 1].status !== 'DONE') {
       const now = new Date();
       events[events.length - 1].durationStr = msToReadableTime(now - events[events.length - 1].time) + " (Ongoing)";
    }

    return events.map((ev, i) => (
      <div key={i} className="flex gap-4 relative">
        {/* Vertical Line */}
        {i !== events.length - 1 && <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-blue-200"></div>}
        
        {/* Dot */}
        <div className="w-8 h-8 rounded-full bg-blue-500 border-4 border-blue-100 flex-shrink-0 z-10"></div>
        
        {/* Content */}
        <div className="pb-8">
          <p className="text-sm text-gray-500 font-medium">{formatDate(ev.time)}</p>
          <h4 className="text-lg font-bold text-gray-800">{ev.action}</h4>
          {ev.by && <p className="text-xs text-gray-500">By: {ev.by}</p>}
          
          {ev.durationStr && (
            <div className="mt-2 inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm font-semibold border border-gray-200">
              Stayed here for: {ev.durationStr}
            </div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-gray-800">Task Timeline</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 font-bold text-2xl transition">&times;</button>
        </div>
        
        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading history...</p>
        ) : (
          <div className="mt-4 ml-2">
            {renderTimelineEvents()}
          </div>
        )}
      </div>
    </div>
  );
}