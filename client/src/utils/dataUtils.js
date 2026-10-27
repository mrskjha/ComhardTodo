export const isOverdue = (deadline, status) => {
  if (status === 'DONE') return false; 
  const now = new Date();
  const slaDate = new Date(deadline);
  return now > slaDate; 
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
};

export const msToReadableTime = (ms) => {
  if (!ms || ms === 0) return '0 hrs';
  
  const totalMinutes = Math.floor(ms / (1000 * 60));
  
  if (totalMinutes < 60) {
    return `${totalMinutes} mins`;
  }
  
  const hours = (totalMinutes / 60).toFixed(1);
  return `${hours} hrs`;
};