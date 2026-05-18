# AI-Based Employee Performance Analytics & Recommendation System

A production-ready full-stack MERN application tailored for analyzing employee performance and providing AI-driven recommendations using OpenRouter (Mistral model).

## Features
- **Authentication**: Secure JWT-based login and signup.
- **Employee Management**: CRUD operations for employees, with search and department filtering.
- **Analytics Dashboard**: Visual representation of employee statistics using Recharts.
- **AI Recommendation**: Deep performance analysis, promotion recommendation, and skill gap identification using AI.
- **PDF Export**: One-click export of AI performance reports.
- **Modern UI**: Fully responsive, aesthetic design using Tailwind CSS and Lucide React.

## Project Structure
- `/client`: Frontend built with React, Vite, Tailwind CSS, and Recharts.
- `/server`: Backend built with Node.js, Express, MongoDB, and OpenRouter API integration.

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- OpenRouter API Key

### Backend Setup
1. Navigate to `/server`.
2. Run `npm install`.
3. Create a `.env` file in the `/server` directory with:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/employee-analytics
   JWT_SECRET=your_super_secret_jwt_key
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```
4. Start the server: `npm run dev`.

### Frontend Setup
1. Navigate to `/client`.
2. Run `npm install`.
3. Start the Vite dev server: `npm run dev`.
4. Open `http://localhost:5173` in your browser.

## Deployment to Render

### 1. Database (MongoDB Atlas)
Ensure your MongoDB is hosted on Atlas and update the `MONGO_URI` environment variable.

### 2. Backend Deployment (Web Service)
- Connect your GitHub repository to Render.
- Create a new "Web Service" in Render.
- Set Root Directory to `server`.
- Build Command: `npm install`
- Start Command: `npm start`
- Add Environment Variables (`MONGO_URI`, `JWT_SECRET`, `OPENROUTER_API_KEY`, `PORT=5000`).

### 3. Frontend Deployment (Static Site)
- Create a new "Static Site" in Render.
- Set Root Directory to `client`.
- Build Command: `npm run build`
- Publish Directory: `dist`
- Add Rewrite Rule to support React Router:
  - Source: `/*`
  - Destination: `/index.html`
  - Status: `200`

## API Endpoints Overview
- `POST /api/auth/signup`: Register user
- `POST /api/auth/login`: Login user
- `GET /api/employees`: Get all employees
- `GET /api/employees/search?department=HR&search=John`: Search/Filter employees
- `POST /api/employees`: Add employee
- `PUT /api/employees/:id`: Update employee
- `DELETE /api/employees/:id`: Delete employee
- `POST /api/ai/recommend`: Generate AI feedback for employee

## Troubleshooting
- **CORS Issues**: In production, ensure you configure the `cors` middleware in `server.js` to accept requests from your frontend Render URL.
- **OpenRouter Timeout**: The AI generation might take a few seconds. The UI includes a loading state.

---
*Built with React, Node, Express, MongoDB, and Tailwind CSS.*
