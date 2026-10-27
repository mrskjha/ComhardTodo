const mongoose = require('mongoose');

const taskHistorySchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  oldStatus: {
    type: String,
    enum: ['TODO', 'IN_PROCESS', 'DONE'],
    required: true
  },
  newStatus: {
    type: String,
    enum: ['TODO', 'IN_PROCESS', 'DONE'],
    required: true
  },
  changedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Tracks who dragged the card
  }
}, { 
  // We only need to know when it changed, not when this log was updated
  timestamps: { createdAt: 'changedAt', updatedAt: false } 
});

// Index for quickly fetching history of a specific task
taskHistorySchema.index({ taskId: 1, changedAt: -1 });

module.exports = mongoose.model('TaskHistory', taskHistorySchema);