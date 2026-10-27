# Advanced Task Management CRM

A full-stack MERN (MongoDB, Express, React, Node.js) application designed for enterprise-level task management. This CRM goes beyond standard CRUD operations by introducing SLA deadline tracking, time-in-phase analytics, and a comprehensive visual audit trail (timeline) for every task.

## 🚀 Key Features

* **Advanced Analytics Dashboard:** Tracks and calculates the exact time a task spends in the 'Todo' and 'In Process' phases using backend stopwatch logic.
* **SLA & Overdue Tracking:** Monitors SLA deadlines and automatically flags overdue/breached tasks with visual indicators.
* **Interactive Views:** Manage tasks seamlessly across **Kanban**, **Grid**, and **List** views.
* **Task Lifecycle Timeline:** Generates a detailed audit trail (history modal) showing exactly when a task moved between phases and who moved it.
* **Robust Search & Filtering:** Real-time case-insensitive search and status-based filtering directly from the database.
* **Authentication:** Secure user authentication using JWT and bcrypt.
* **Dockerized:** Fully containerized using Docker Compose for a seamless one-click local setup.

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite), Tailwind CSS v4, Context API, React Router DOM
* **Backend:** Node.js (v22), Express.js, Mongoose
* **Database:** MongoDB Atlas
* **Deployment/DevOps:** Docker, Docker Compose, Vercel (Frontend), Render (Backend)

## ⚙️ Prerequisites

Before running this project, ensure you have the following installed:
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Recommended)
* [Node.js](https://nodejs.org/) (v22+)
* [Git](https://git-scm.com/)

## 🐳 Quick Start (Using Docker)

The easiest way to run the entire stack (Frontend, Backend, and Database) is using Docker Compose.

1. Clone the repository:
   ```bash
   git clone [<your-repo-url>](https://github.com/mrskjha/ComhardTodo)
   cd comhardtodo
   ```
2. Run the Docker build command:
   ```bash
   docker-compose up --build
   ```
3. Open your browser and navigate to: `http://localhost:5173`

## 💻 Manual Local Setup

If you prefer running the servers manually without Docker:

### 1. Environment Variables
Create a `.env` file in the `server` directory and add the following:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Backend Setup
```bash
cd server
npm install
npm start
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

## 🌍 Live Deployment

This project can be easily deployed to the cloud:

1. **Database:** Hosted on **MongoDB Atlas**.
2. **Backend (Render):** 
   * Connect the repository to Render.
   * Set root directory to `server`.
   * Add `MONGODB_URI` and `JWT_SECRET` in the Environment Variables.
3. **Frontend (Vercel):**
   * Connect the repository to Vercel.
   * Set root directory to `client`.
   * Add `VITE_API_URL` pointing to the Render backend URL.

## 📡 API Endpoints Overview

* **Auth:** `POST /api/auth/register`, `POST /api/auth/login`
* **Tasks:** 
  * `POST /api/tasks` - Create task
  * `GET /api/tasks?search=&status=` - Fetch tasks with filters
  * `PUT /api/tasks/:id` - Update details
  * `PATCH /api/tasks/:id/status` - Move task pipeline (triggers analytics update)
  * `GET /api/tasks/:id/timeline` - Fetch audit trail

## 👨‍💻 Author

**Sunny Kumar**
* GitHub: [@mrskjha](https://github.com/mrskjha)
* B.Tech CSE | MERN Stack Developer
