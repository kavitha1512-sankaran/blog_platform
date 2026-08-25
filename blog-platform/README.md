# BlogSphere - Full Stack Blog Platform

## Technology Stack

### Frontend
- React
- Vite
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- bcrypt password hashing

## Features

- User registration
- User login
- JWT authentication
- Create blog posts
- Edit own posts
- Delete own posts
- View all posts
- View individual posts
- Add comments
- Delete own comments
- Responsive UI

## Project Structure

blog-platform/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md

## Setup

### 1. Start MongoDB

Use local MongoDB or MongoDB Atlas.

For local MongoDB, the database name used by the project is:
blog_platform

### 2. Backend

Open a terminal:

cd backend
npm install

Create `.env` from `.env.example`.

Example:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/blog_platform
JWT_SECRET=replace_with_a_long_secret

Run:

npm run dev

Backend:
http://localhost:5000

### 3. Frontend

Open another terminal:

cd frontend
npm install
npm run dev

Frontend:
http://localhost:5173

## API Endpoints

### Authentication

POST /api/auth/register
POST /api/auth/login
GET /api/auth/me

### Posts

GET /api/posts
GET /api/posts/:id
POST /api/posts
PUT /api/posts/:id
DELETE /api/posts/:id

### Comments

POST /api/comments/post/:postId
DELETE /api/comments/:id

Protected endpoints require:

Authorization: Bearer <JWT_TOKEN>
