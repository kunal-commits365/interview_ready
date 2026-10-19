# AI Interview Preparation & Resume Builder

An AI-powered web application that helps candidates prepare for job interviews by analyzing their resume against a job description. It generates personalized interview questions, identifies skill gaps, creates a preparation plan, and helps tailor resumes using Google's Gemini API.

## Features

- **AI-Powered Interview Analysis** — Analyze a candidate's resume against a target job description.
- **Resume Upload** — Upload a PDF resume for analysis (maximum 3 MB).
- **Job Match Score** — Get an AI-generated score indicating how well your profile matches the target role.
- **Technical Interview Questions** — Generate role-specific questions with explanations of interviewer intent and guidance on how to answer.
- **Behavioral Interview Questions** — Prepare for behavioral questions with answer guidance.
- **Skill Gap Analysis** — Identify missing or underdeveloped skills and their severity.
- **Personalized Preparation Plan** — Get a day-wise plan to prepare for the interview.
- **AI Resume Builder** — Generate a tailored, ATS-friendly resume in PDF format.
- **User Authentication** — Register, log in, and log out securely.
- **Interview Report History** — Save, view, and revisit previously generated interview reports.

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- React Router
- Axios
- SCSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Google Gemini API (`@google/genai`)
- JWT Authentication
- bcryptjs
- Multer
- PDF parsing with `pdf-parse`
- PDF generation with Puppeteer
- Zod for schema validation

## Project Structure

```text
gen-ai/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── middleware/
│   │   ├── model/
│   │   ├── routes/
│   │   └── service/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── .gitignore
└── README.md
```

## Prerequisites

Before running the project, make sure you have:

- [Node.js](https://nodejs.org/) installed
- npm installed
- A MongoDB database (local or MongoDB Atlas)
- A Google Gemini API key

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd gen-ai
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your repository's actual URL.

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=3000
mongo_uri=YOUR_MONGODB_CONNECTION_STRING
jwt_secret=YOUR_STRONG_RANDOM_SECRET
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Replace the placeholder values with your own credentials. Never commit your `.env` file or expose API keys and secrets publicly.

Start the backend:

```bash
npm run dev
```

The backend should run at `http://localhost:3000`.

### 3. Set up the frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

The frontend's Vite configuration proxies `/api` requests to the backend at `http://localhost:3000`.

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Log in |
| GET | `/api/auth/logout` | Log out |
| GET | `/api/auth/getme` | Get the authenticated user |
| POST | `/api/interview` | Generate an interview report |
| GET | `/api/interview` | Get the user's interview reports |
| GET | `/api/interview/report/:interviewId` | Fetch a specific report |
| POST | `/api/interview/resume/pdf/:interviewReportId` | Generate and download a tailored resume PDF |
| GET | `/health` | Check backend health |

Interview endpoints require authentication.

## Environment Variables

|