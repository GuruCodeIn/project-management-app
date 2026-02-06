# Project & Task Management App

## Tech Stack
- Node.js + Express (TypeScript)
- MongoDB + Mongoose
- React (Class Components)
- Redux + Redux Thunk
- Material UI

## Features
- CRUD Projects
- CRUD Tasks under each project
- Mark task as completed
- Centralized error handling
- Input validation
- Cascade delete tasks when project deleted
- CORS enabled for frontend

## Setup Instructions

### 1. Clone Repo
git clone https://github.com/GuruCodeIn/project-management-app.git
cd project-management-app

### 2. Backend Setup
cd backend
npm install

Create .env file:

PORT=5005
MONGO_URI=your_mongodb_connection_string

npm run dev

### 3. Frontend Setup
cd frontend
npm install
npm start

App opens at:
http://localhost:3000

## How It Works

1. Create Project  
2. Click project → open tasks  
3. Add tasks  
4. Click COMPLETE → status becomes Done  
5. Data saved in MongoDB

## Architecture

Frontend → Redux → Axios → Express API → MongoDB

## Bonus
- Modern UI with Material UI  
- Real-time state update after task completion
