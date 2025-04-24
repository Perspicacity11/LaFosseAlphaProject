# GeoQuiz Game - Backend Server

This is the backend API for the GeoQuiz Game, a geography-based quiz application, built using Node.js, Express, and PostgreSQL.

---



## Description

This backend handles all server-side operations for the GeoQuiz Game. It provides a RESTful API for user management, authentication, game session tracking, and database interactions. The system securely stores user credentials, generates JWT tokens for protected routes, and logs quiz game sessions with corresponding scores. It integrates a PostgreSQL database for persistent storage and uses middleware for authentication enforcement. The architecture is modular, separating concerns into controllers, models, and routes for maintainability and scalability.


## Features

- User Authentication (Signup & Login with JWT)
- Secure Password Encryption using bcrypt
- Session Tracking (e.g., country/flag/capital guessing)
- Score Accumulation
- Jest for Test Coverage

---


## API Endpoints

### User Routes

| Method | Endpoint         | Description                          |
|--------|------------------|--------------------------------------|
| GET    | `/users/`        | Get all users                        |
| GET    | `/users/:id`     | Get a single user by ID              |
| POST   | `/users/signup`  | Create a new user                    |
| POST   | `/users/login`   | Login and receive JWT token          |
| PATCH  | `/users/:id`     | Update user info or score            |
| DELETE | `/users/:id`     | Delete a user                        |

### Session Routes

| Method | Endpoint          | Description                       |
|--------|-------------------|-----------------------------------|
| GET    | `/sessions/`      | Get all sessions                  |
| GET    | `/sessions/:id`   | Get a session by ID               |
| POST   | `/sessions/`      | Create a new game session         |
| DELETE | `/sessions/:id`   | Delete a session                  |



## Database Schema

Two core tables are defined in the `quizzes.sql` file:

### `users` Table

| Column       | Type         | Description                         |
|--------------|--------------|-------------------------------------|
| `id`         | `SERIAL`     | Primary key                         |
| `username`   | `VARCHAR(30)`| Unique username                     |
| `email`      | `VARCHAR(100)`| Unique email address               |
| `password`   | `VARCHAR(100)`| Hashed password                    |
| `total_score`| `INT`        | Running total of user's score       |
| `isAdmin`    | `BOOLEAN`    | Indicates if user has admin rights  |
| `session_ids`| `INT[]`      | Array of related session IDs        |

### `sessions` Table

| Column          | Type          | Description                      |
|-----------------|---------------|----------------------------------|
| `id`            | `SERIAL`      | Primary key                      |
| `user_id`       | `INT`         | References `users.id`            |
| `session_type`  | `VARCHAR(255)`| Type of quiz (e.g., country)     |
| `session_score` | `INT`         | Score obtained in this session   |



## Tech Stack

- Node.js + Express for backend server and routing
- PostgreSQL for relational database
- JWT for user authentication
- bcrypt for password encryption
- Jest for unit testing and code coverage
