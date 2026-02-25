📝 Full-Stack Blog Application
Node.js • Express • MongoDB Atlas • MVC Architecture

A production-style blog platform built with Node.js, Express, MongoDB (Atlas), and EJS, implementing secure authentication, ownership-based authorization, relational data modeling, and optimized database querying.

This project demonstrates backend architecture design, session management, cloud database integration, and secure multi-user access control.

🚀 Key Highlights

🔐 Authentication & Session Management

User registration & login

Password hashing with bcrypt

Express-session with MongoDB session store

Secure session cookies

🛡 Authorization & Ownership Control

Route-level protection middleware

Ownership validation in controller layer

Users can edit/delete only their own posts

Conditional UI rendering based on permissions

🔗 Relational Data Modeling

One-to-many relationship: User → Posts

Mongoose ref + populate() implementation

“View all posts by this user” functionality

☁ Cloud Database Integration

MongoDB Atlas configuration

Environment variable management

Production-ready connection handling

🖼 File Uploads

Image upload handling with Multer

Dynamic image rendering in views

⚡ Query Optimization

.select() to reduce payload size

.lean() for performance improvement

Indexed fields for efficient querying

Targeted .populate() usage

🏗 Architecture Overview

This application follows the Model-View-Controller (MVC) pattern for scalability and maintainability.

src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 ├── config/
 ├── app.js
 └── server.js

 Application Flow
Client Request
   ↓
Routes
   ↓
Middleware (Auth / Ownership)
   ↓
Controllers
   ↓
Models (Mongoose)
   ↓
MongoDB Atlas

🛠 Technology Stack

Backend

Node.js

Express

MongoDB

MongoDB Atlas

Mongoose

Authentication

express-session

connect-mongo

bcrypt

Frontend

EJS templating

Bootstrap

Multer (file uploads)

👨‍💻 Author

Colin McAteer
Cybersecurity & Software Security Graduate Student
Arizona State University
