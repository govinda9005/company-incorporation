# Company Incorporation Tool – Frontend

This is the frontend application for the Company Incorporation Tool.

Built using:

- React (Vite)
- Tailwind CSS
- DaisyUI
- Axios
- React Router

## Features

- Step 1: Create Company
- Step 2: Add Shareholders Dynamically
- Save Draft Progress
- Edit Existing Company
- Admin Dashboard (View All Companies)
- Update Company Status
- Delete Company with Confirmation

## Application Flow

1. User creates a company (basic details)
2. User adds shareholders dynamically
3. Company can be saved as DRAFT
4. Admin dashboard displays all companies
5. Status can be updated to COMPLETED

## API Integration

The frontend connects to the backend API running at:

http://localhost:3001

Make sure the backend is running before starting the frontend.

## Running the Frontend

From the `frontend` directory:

```bash
npm install
npm run dev
```

The application will run at:

http://localhost:5173

## Folder Structure

company-incorporation/
│
├── backend/ # Express + Prisma + PostgreSQL API
│
├── frontend/ # React (Vite) frontend application
│ │
│ ├── public/
│ │ └── vite.svg
│ │
│ ├── src/
│ │ ├── components/
│ │ │ ├── Admin.jsx
│ │ │ ├── Step1Company.jsx
│ │ │ └── Step2Shareholders.jsx
│ │ │
│ │ ├── services/
│ │ │ └── api.js
│ │ │
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ │
│ ├── index.html
│ ├── package.json
│ ├── package-lock.json
│ ├── vite.config.js
│ ├── eslint.config.js
│ └── README.md
│
├── docker-compose.yml
└── README.md

### Frontend Structure

- components/ → Multi-step form components and Admin dashboard
- services/ → API communication layer (Axios)
- App.jsx → Route configuration
- main.jsx → React entry point

## UI Stack

- Tailwind CSS for utility-first styling
- DaisyUI for prebuilt UI components
- Responsive layout design
- Clean form validation flow

## Author

Govinda Yadav
