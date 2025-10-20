# Task Manager (MERN)

## Requirements
- Node.js 18+
- MongoDB running locally or a connection string (Atlas)

## Backend setup (`backend/`)
1. Copy `.env.example` to `.env` and set values:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017
MONGO_DB=task_manager
JWT_SECRET=supersecretjwtkeychangeme
```
2. Install deps:
```
npm install
```
3. Run dev:
```
npm run dev
```

## Frontend setup (`frontend/`)
1. Create `.env` (optional) to set API base URL (defaults to http://localhost:5000/api):
```
VITE_API_URL=http://localhost:5000/api
```
2. Install deps:
```
npm install
```
3. Run dev:
```
npm run dev
```

Open http://localhost:5173

## Features
- JWT auth (signup/login/logout)
- Tasks CRUD with filtering
- Validation: required title & description
- Tailwind responsive UI
- Bonus: overdue highlight, priority field

## API routes
- POST `/api/auth/signup`
- POST `/api/auth/login`
- GET `/api/tasks`
- POST `/api/tasks`
- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`
