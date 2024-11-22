# Flight Booking System - Server

## Overview
This is the backend server for the Flight Booking System, built using the MERN stack (MongoDB, Express.js,  Node.js). The server provides a RESTful API that enables flight booking, user authentication, and management for both users and admins.

## Features
- **User Authentication:**
  - User registration, login, and logout with JWT authentication.
  - Role-based access (Admin/User).
  - Passwords hashed using bcrypt.
  
- **Flight Management:**
  - Admin users can add, update, and delete flights.
  - Users can search for flights and view available options.

- **Booking Management:**
  - Users can make bookings for available flights.
  - Admins can manage (view, update, delete) bookings.

- **Email Confirmation:**
  - Users receive flight booking confirmation emails using Nodemailer.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/flight-booking-server.git
cd flight-booking-server

 env file 
 NODE_ENV = development
PORT= 5000
DATABASE_URL = your db connection
SALT_ROUND = number
JWT_SECRET_KEY = use a key
ADMIN_PASSWORD = use a password
