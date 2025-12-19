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
```

### Protected Route

- Header:

### Login

- **URL**: `/api/users/login`
- **Method**: POST
- **Response**: JWT token

### Create Task

- **URL**: `/api/tasks`
- **Method**: POST
- **Auth**: Bearer Token

### Get Tasks

- **URL**: `/api/tasks`
- **Method**: GET
- **Auth**: Bearer Token
- **Description**: Get task list of logged-in user
