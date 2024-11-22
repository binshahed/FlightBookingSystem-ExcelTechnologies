# Flight Booking System - React App

## Overview
This is the frontend for the Flight Booking System, built using React. The application allows users to search for flights, view available options, make bookings, and manage their profiles. Admins can manage flights and bookings.

## Features
- **User Authentication:**
  - Users can register, log in, and view their profile.
  - JWT token is used for authentication.

- **Flight Search:**
  - Users can search for flights based on origin, destination, and date.
  - Flight details such as airline, price, available seats, etc., are displayed.

- **Booking:**
  - Users can book flights and view booking history.
  - Admin users can view all bookings and manage them.

- **Admin Dashboard:**
  - Admins can add, update, and delete flights.

- **Responsive UI:**
  - The UI is responsive and optimized for both desktop and mobile views.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/flight-booking-client.git
cd flight-booking-client

.env
VITE_NODE_ENV=development
VITE_BASE_URL=http://localhost:5000/api
