# Competency Assessment Platform - Frontend

#### This is the client-side application for the Competency Assessment Platform, built with React and Vite. It provides a user-friendly interface for students to register, log in, and take their digital competency assessments.

## Live Links

- Frontend Live URL: https://competency-assessment-frontend.vercel.app
- Backend Live UR: https://competency-assessment-backend.vercel.app

## Features

- User Authentication: Clean and simple forms for user registration and login.
- State Management: Centralized state management using Redux Toolkit, with user session persistence via Redux Persist.
- Protected Routes: Secure routing that only allows authenticated users to access the dashboard and assessment pages.
- Interactive Dashboard: A simple dashboard showing the user's current status and highest achieved level.
- Assessment Interface: A clean and responsive interface for taking the multi-question assessment.
- Real-time Feedback: Instant feedback on assessment submission using SweetAlert2 notifications.

## Login Credentials

#### Admin

To test the admin functionalities (like creating questions via Postman), you can use the following credentials after creating the admin user in the database.

- Email: `admin@example.com`

- Password: `admin123`

#### Student

To test the student functionalities, you can use the following credentials or register a new user.

- Email: `student@example.com`

- Password: `student123`

## Technology Stack

- Framework/Library: React
- Build Tool: Vite
- Language: TypeScript
- State Management: Redux Toolkit, RTK Query, Redux Persist
- Routing: React Router DOM
- Styling: Tailwind CSS
- Notifications: SweetAlert2
- Deployment: Vercel

## Setup and Installation (Local)

To run this project locally, follow these steps:

Clone the repository:

`git clone [frontend repository link]`

`cd competency-assessment-frontend`

Install dependencies:
`npm install`

Connect to the backend:

Make sure your backend server is running. The API base URL in `src/redux/api/baseApi.ts` is set to connect to the local server by default.

Run the development server:
`npm run dev`

The application will be available at http://localhost:5173 (or another port if 5173 is busy).
