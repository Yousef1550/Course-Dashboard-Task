# 📚 Course Dashboard Task

A simple and clean course dashboard built with Node.js.  
This project serves as a backend API for managing courses, users, and related functionalities.

---

## 🚀 Features

- **User Authentication**: Register and login functionalities with JWT-based authentication.
- **Course Management**: Create, read, update, and delete courses.
- **User Dashboard**: Personalized dashboard displaying courses and progress.
- **Error Handling**: Global error handler for managing exceptions and errors gracefully.

---

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM for MongoDB.
- **JWT**: JSON Web Tokens for authentication.
- **bcrypt**: Library for hashing passwords.
- **dotenv**: Module to load environment variables.


## Getting Started

### Prerequisites
- Node.js (Latest LTS Version)
- MongoDB 
- Cloudinary Account (for image storage)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/job-search-app.git
   cd job-search-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_URL=your_cloudinary_url
   ```
4. Start the application:
   ```sh
   npm start
   ```
