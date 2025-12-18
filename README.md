# Task Manager Backend API

Backend API for a simple task management system built with Node.js, Express and MongoDB.

## Tech Stack
- Node.js
- Express
- MongoDB + Mongoose
- JWT (coming soon)

## API Endpoints

### Register User
**POST** `/api/users/register`

Request body:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456"
}
