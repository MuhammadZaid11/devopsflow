# TaskFlow
<img width="1364" height="695" alt="image" src="https://github.com/user-attachments/assets/f598f6d0-86e7-45ed-9614-c891371e75af" />
<img width="1366" height="693" alt="image" src="https://github.com/user-attachments/assets/12c6cc9f-ec20-428e-abf3-f922fbbfd9f9" />
<img width="1366" height="688" alt="image" src="https://github.com/user-attachments/assets/f1c8fb34-085f-48b4-a4b4-3b704ec2e0d1" />
<img width="1366" height="670" alt="image" src="https://github.com/user-attachments/assets/ef443020-21cc-4ce4-88dc-e4d82cf256c9" />

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
