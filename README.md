# School Management Application

## Overview

The School Management application is a web-based platform designed to streamline and manage school-related tasks for both faculty and students. It supports features such as student management, student attendance tracking, class management, and user authentication.

## Features

- **User Authentication:**
  - Sign up as a faculty member or student.
  - Secure login with email and password.

- **User Roles:**
  - Differentiates between faculty and student roles.
  - Generates unique IDs for faculty and student users.

- **Class Management:**
  - Faculty can create and manage classes.
  - Students can view their enrolled classes.

- **Attendance Tracking:**
  - Faculty can record daily attendance for each class.
  - Students can view their attendance records.

 ### Tech stacks:

**For "School Management" (backend):**

- Node.js Framework: Express
- Database ODM: Mongoose
- Authentication: BcryptJS, JSON Web Token (jsonwebtoken)
- Middleware: cors, dotenv
- Database: MongoDB
- Development: Nodemon for auto-restarting the server during development

- 
 **For "schoolattandance" (frontend):**
- JavaScript Framework/Library: React
- State Management: Redux Toolkit, React-Redux
- Routing: React Router DOM
- HTTP Requests: Axios
- UI Framework: Material-UI (using @mui packages)
- Date Libraries: date-io/dayjs, moment
- Styling: styled-components, Emotion (styled-engine-sc)
- Calendar Components: react-big-calendar, react-calendar
- Icons: react-icons
- Form Libraries: react-tabs
- Utility Libraries: lodash, uuid
- Development: Vite for bundling and development server
- Linting: ESLint with React-specific plugins
- Typescript Support: TypeScript definitions for React (@types/react, @types/react-dom)
- Sass: Sass for styling

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB database set up

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/school-management.git

2. cd school-management
3. npm install
4. npm run dev
5. Visit http://localhost:4000 to access the application.

### Project Structure
client: Frontend React application.
server: Backend Node.js and Express server.

### API Documentation
The API endpoints for attendance and class management are documented in the server code.

### Contributing
Fork the repository.
Create a new branch: git checkout -b feature/your-feature.
Commit your changes: git commit -m 'Add some feature'.
Push to the branch: git push origin feature/your-feature.
Submit a pull request.

### Contact
Nikhil Pattarwal
Email: nikhilpatterwal123@gmail.com



