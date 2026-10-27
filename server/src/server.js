require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors({
  origin: [
    'https://comhardtodo.netlify.app',
    'http://localhost:5173'           
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true, 
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Global Error Handler (Fallback)
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));