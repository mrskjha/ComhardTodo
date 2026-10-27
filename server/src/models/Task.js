const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    trim: true 
  },
  status: {
    type: String,
    enum: ['TODO', 'IN_PROCESS', 'DONE'],
    default: 'TODO'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Ensures only the owner can view/edit their tasks
  },
  // SLA Tracking
  slaDeadline: { 
    type: Date, 
    required: true // The hard limit for the task to be DONE
  },
  startedAt: { 
    type: Date // Stamped when status first changes to IN_PROCESS
  },
  completedAt: { 
    type: Date // Stamped when status changes to DONE
  },
  timeInTodo: { 
    type: Number, 
    default: 0 // Milliseconds save
  },
  timeInProcess: { 
    type: Number, 
    default: 0 
  },
  lastStateChangedAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Indexes for highly optimized Search & Filter queries
taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ title: 'text', description: 'text' }); // Enables MongoDB text search

module.exports = mongoose.model('Task', taskSchema);