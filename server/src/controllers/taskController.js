const Task = require('../models/Task');
const TaskHistory = require('../models/TaskHistory');

// ==========================================
// 1. CREATE: 
// ==========================================
exports.createTask = async (req, res) => {
  try {
    const { title, description, slaDeadline } = req.body;
    const userId = req.user.id;

    if (!title || !slaDeadline) {
      return res.status(400).json({ message: 'Title aur SLA Deadline zaroori hai!' });
    }

    const newTask = new Task({ title, description, slaDeadline, userId });
    const savedTask = await newTask.save();
    
    res.status(201).json({ message: 'Task create ho gaya', task: savedTask });
  } catch (error) {
    console.error('Create Task Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ==========================================
// 2. READ: 
// ==========================================
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { search, status } = req.query; 

    
    let query = { userId };

    
    if (status) {
      query.status = status;
    }


    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },       
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.status(200).json({ count: tasks.length, tasks });
  } catch (error) {
    console.error('Get Tasks Error:', error);
    res.status(500).json({ message: 'Tasks laane mein problem hui' });
  }
};

// ==========================================
// 3. UPDATE:
// ==========================================
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, slaDeadline } = req.body;
    const userId = req.user.id;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId },
      { title, description, slaDeadline },
      { new: true, runValidators: true }
    );

    if (!updatedTask) return res.status(404).json({ message: 'Task nahi mila' });

    res.status(200).json({ message: 'Task update ho gaya', task: updatedTask });
  } catch (error) {
    console.error('Update Task Error:', error);
    res.status(500).json({ message: 'Update error' });
  }
};

// ==========================================
// 4. DELETE: 
// ==========================================
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deletedTask = await Task.findOneAndDelete({ _id: id, userId });
    if (!deletedTask) return res.status(404).json({ message: 'Task nahi mila' });

    await TaskHistory.deleteMany({ taskId: id });

    res.status(200).json({ message: 'Task delete ho gaya' });
  } catch (error) {
    console.error('Delete Task Error:', error);
    res.status(500).json({ message: 'Delete error' });
  }
};

// ==========================================
// 5. STATUS UPDATE: Todo -> In Process -> Done
// ==========================================
exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { newStatus } = req.body;
    const userId = req.user.id;

    const validStatuses = ['TODO', 'IN_PROCESS', 'DONE'];
    if (!validStatuses.includes(newStatus)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const task = await Task.findOne({ _id: id, userId });
    if (!task) return res.status(404).json({ message: 'Task nahi mila' });

    const oldStatus = task.status;
    if (oldStatus === newStatus) return res.status(200).json({ task });

    // TIME TRACKING MATHS (Stopwatch logic)
    const now = new Date();
    const timeSpentMilliseconds = now - task.lastStateChangedAt; 

    if (oldStatus === 'TODO') {
      task.timeInTodo += timeSpentMilliseconds;
    } else if (oldStatus === 'IN_PROCESS') {
      task.timeInProcess += timeSpentMilliseconds;
    }

    task.lastStateChangedAt = now;

    if (newStatus === 'IN_PROCESS' && !task.startedAt) task.startedAt = now;
    if (newStatus === 'DONE') task.completedAt = now;
    else if (oldStatus === 'DONE') task.completedAt = null;

    task.status = newStatus;

    const TaskHistory = require('../models/TaskHistory');
    const historyLog = new TaskHistory({
      taskId: task._id,
      oldStatus,
      newStatus,
      changedBy: userId
    });

    await Promise.all([task.save(), historyLog.save()]);

    res.status(200).json({ message: 'Status aur Time updated', task });
  } catch (error) {
    console.error('Status Update Error:', error);
    res.status(500).json({ message: 'Status update error' });
  }
};

exports.getTaskTimeline = async (req, res) => {
  try {
    const { id } = req.params;
    
    const history = await TaskHistory.find({ taskId: id })
      .sort({ changedAt: 1 })
      .populate('changedBy', 'name'); 

    res.status(200).json(history);
  } catch (error) {
    console.error('Timeline Error:', error);
    res.status(500).json({ message: 'Timeline laane mein problem hui' });
  }
};