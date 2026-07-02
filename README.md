# TaskFlow

TaskFlow is a full-stack MERN (MongoDB, Express, React, Node.js) team task and project management application.

## Prerequisites

- Node.js (v18+ recommended)
- MongoDB running locally or a MongoDB Atlas URI

## Setup & Running Locally

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and verify the API URL:
   ```bash
   cp .env.example .env
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Features
- JWT Authentication & Role-based Access Control (Admin, Manager, Member)
- Organization & Project Management
- Task Management with Kanban Board
- File Attachments and Comments

## Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Multer, Jest, Supertest
- **Frontend:** React (Vite), React Router, Axios, Tailwind CSS
