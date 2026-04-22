# MERN Todo App

A full-stack todo application built with the MERN stack. Users can register, log in, and manage their personal tasks.

## Live Demo

[https://mern-todo-app-jade.vercel.app](https://mern-todo-app-jade.vercel.app)

## Features

- User registration and login with JWT authentication
- Add, edit, and delete tasks
- Mark tasks as complete
- Task creation date displayed on each task
- Stats showing total, completed, and remaining tasks
- Protected routes - each user only sees their own tasks

## Tech Stack

**Frontend:** React, Tailwind CSS, Vite  
**Backend:** Node.js, Express.js  
**Database:** MongoDB Atlas  
**Deployment:** Vercel (frontend + backend)

## Getting Started Locally

### Prerequisites
- Node.js installed
- MongoDB Atlas account or local MongoDB

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

```bash
node server.js
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend folder:

```
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```