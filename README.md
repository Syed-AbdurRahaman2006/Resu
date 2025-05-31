# RESUMATCH - Resume Builder

https://resume-builders.vercel.app/


A modern resume builder application built with the MERN stack, allowing users to create professional resumes using customizable templates.

## Features

- 🔐 JWT-based authentication
- 📄 Multiple resume templates (Classic, Modern, Creative)
- 🎨 Real-time preview
- 📑 PDF export functionality
- 💾 Save and manage multiple resumes
- 📱 Responsive design
- 🌙 Dark mode support

## Tech Stack

- Frontend:
  - React.js
  - Redux Toolkit
  - Tailwind CSS
  - HTML2PDF.js
  - React Router
  - React Toastify

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - JWT
  - Bcrypt

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/resumatch.git
cd resumatch
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Create a .env file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

5. Start the development servers:

Frontend:
```bash
cd frontend
npm run dev
```

Backend:
```bash
cd backend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Usage

1. Sign up or log in to your account
2. Choose a resume template
3. Fill in your personal information, experience, education, skills, etc.
4. Preview your resume in real-time
5. Export your resume as a PDF
6. Save your resume for future editing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/) 
