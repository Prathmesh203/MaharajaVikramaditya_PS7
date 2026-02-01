# Campus Placement Eligibility & Application System (Frontend)

A production-ready React.js frontend for managing campus placements, featuring automated eligibility verification, readiness metrics, and fair hiring practices.

## Features

- **Dual-Role Authentication**: Secure login for Students and Companies.
- **Student Dashboard**: 
  - Real-time **Readiness Score** & Skill Gap Analysis.
  - Automated **Eligibility Verification** for upcoming drives.
- **Company Dashboard**:
  - **Trust Score** metrics based on placement history.
  - Job posting management and applicant tracking.
- **Assessment Interface**:
  - Timed MCQ and Short Answer tests.
  - Instant results and performance breakdown.
- **Responsive Design**: Mobile-first UI built with Tailwind CSS.

## Tech Stack

- **React.js (Vite)**: Fast, modern frontend framework.
- **Tailwind CSS (v4)**: Utility-first styling.
- **React Router**: Client-side routing.
- **Context API**: State management for Authentication.
- **Axios**: API integration (configured in `src/services/api.js`).
- **Lucide React**: Iconography.

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── common/         # Atomic components (Button, Card, Input)
│   ├── features/       # Feature-specific components (Auth, Dashboard, Test)
│   └── layout/         # Layout components (Navbar, Footer)
├── context/            # Global state (AuthContext)
├── pages/              # Page components (Routes)
├── services/           # API services and mock data
├── utils/              # Utility functions (cn, etc.)
└── hooks/              # Custom hooks
```

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## API Integration

The application is configured to connect to a backend via `src/services/api.js`. Update the `VITE_API_URL` environment variable to point to your live backend. Currently, it uses mock data for demonstration purposes.
