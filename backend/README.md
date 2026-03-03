# Company Incorporation Tool – Backend

This is the backend API for the Company Incorporation Tool.

Built using:

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- Docker

## Tech Stack

- Express 5
- PostgreSQL
- Prisma ORM
- dotenv
- CORS

## Database Overview

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
Cascade delete enabled.

## API Endpoints

- POST /companies
- PUT /companies/:id
- GET /companies/:id
- GET /companies
- POST /shareholders
- PATCH /companies/:id/status
- DELETE /companies/:id

## Running with Docker (Recommended)

From project root:

```bash
docker compose up --build
```

Backend runs at:
http://localhost:3001

## Running Without Docker

npm install
npx prisma migrate dev
npx nodemon index.js

## Implementation Highlights

- RESTful API structure
- Transaction-based shareholder creation
- Unique company name constraint
- Proper foreign key relationships
- Draft persistence support (status tracking)
- Automatic Prisma migrations in Docker setup

## Folder Structure

backend/
│
├── generated/
│
├── node_modules/
│
├── prisma/
│ ├── migrations/
│ └── schema.prisma
│
├── routes/
│ ├── companyRoutes.js
│ └── shareholderRoutes.js
│
├── .dockerignore
├── .env
├── .gitignore
├── Dockerfile
├── index.js
├── jsconfig.json
├── package.json
├── package-lock.json
├── prisma.config.ts
└── README.md

## Author

Govinda Yadav
