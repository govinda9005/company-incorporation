# Company Incorporation Tool – Full Stack Application

This project is a full stack Company Incorporation Tool built as part of a technical assessment.

It allows users to:

- Create a company (Step 1)
- Add shareholders dynamically (Step 2)
- Save draft progress (no data loss on refresh)
- View all companies in an admin dashboard

## Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- DaisyUI
- Axios
- React Router

### Backend

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- Docker

## Project Structure

```
company-incorporation/
│
├── backend/ # Express + Prisma + PostgreSQL
├── frontend/ # React application
├── docker-compose.yml
└── README.md
```

## Running the Backend with Docker (Recommended)

Make sure Docker Desktop is installed.

From the project root:

```bash
docker compose up --build
```

Normal usage:

```bash
docker compose up
```

This will:

- Start PostgreSQL in a container
- Start backend in a container
- Automatically apply Prisma migrations
- Run backend on port 3001

Backend runs at:
http://localhost:3001

To stop containers:

```bash
docker compose down
```

## Running Without Docker (Manual Setup)

### Backend

```bash
cd backend
npm install
npx prisma migrate dev
npx nodemon index.js
```

Runs at:
http://localhost:3001

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at:

http://localhost:5173

Make sure backend is running before starting frontend.

## Architecture Highlights

- Multi-step company incorporation workflow
- Draft persistence using localStorage
- Dynamic shareholder form generation
- PostgreSQL relational database design
- One-to-many relationship (Company → Shareholders)
- Cascade delete enabled
- Unique company name constraint
- Transaction-based shareholder creation
- RESTful API design
- Dockerized backend and database

## Database Design

### Company

- id (Primary Key)
- name (Unique)
- numberOfShareholders
- totalCapital
- status (DRAFT | COMPLETED)
- createdAt
- updatedAt

### Shareholder

- id (Primary Key)
- firstName
- lastName
- nationality
- companyId (Foreign Key)

Relationship:

One Company → Many Shareholders

## API Overview

- POST /companies
  Create a new company (Step 1 – Save Draft)

- PUT /companies/:id
  Update company draft information

- GET /companies/:id
  Retrieve a single company with its shareholders

- GET /companies
  Retrieve all companies (Admin view)

- POST /companies/:id/shareholders
  Add shareholders to a specific company (Step 2)

## Key Features

- Clean separation of frontend and backend
- Proper relational schema using Prisma
- Automatic database migrations
- Atomic transaction for shareholder creation
- Admin dashboard for company overview
- Production-ready containerized backend

# Author

Govinda Yadav
