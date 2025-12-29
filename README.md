# 🎬 QuickFlick — Movie Ticket Booking Platform

QuickFlick is a full-stack **movie ticket booking web application** built using the **MERN stack**.  
It enables users to browse movies, select showtimes, book seats in real time, and complete secure payments, while providing admins with full control over movies, shows, and bookings.

🔗 **Live Demo:** https://quickflick-sigma.vercel.app

---

## ✨ Features

### 👤 User
- Browse movies and shows powered by **TMDB API**
- Real-time seat selection and booking
- Dynamic seat locking during checkout
- Automatic seat release after **10 minutes** if payment is not completed
- Secure payments using **Stripe**
- Booking confirmation emails
- Automated show reminder emails
- View booking history

### 🛠 Admin
- Add and manage movies and shows
- Configure show timings and pricing
- View bookings and analytics
- Prevent double bookings using seat-state management

---

## 🔐 Authentication & Payments
- **Clerk** for authentication and user management
- **Stripe** for secure payment processing
- Server-side validation for booking and payment flows

---

## 📧 Email Notifications
- Transactional emails via **Brevo SMTP**
- Booking confirmation emails
- Automated show reminder emails

---

## 🧠 Seat Management
- Seats are temporarily locked when checkout begins
- Locks automatically expire after **10 minutes** if payment is incomplete
- Ensures concurrency safety and prevents race conditions

---

## 🧰 Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

### Database & APIs
![MongoDB](https://img.shields.io/badge/MongoDB-001E2B?style=for-the-badge&logo=mongodb&logoColor=47A248)
![TMDB](https://img.shields.io/badge/TMDB-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white)

### Auth, Payments & Deployment
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-1A1A1A?style=for-the-badge&logo=render&logoColor=46E3B7)

---

## 📸 Screenshots

<p align="center">
  <img src="screenshots/home.png" width="42%"
       style="border:1px solid #e5e7eb; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.08);" />
  <img src="screenshots/movies.png" width="42%"
       style="border:1px solid #e5e7eb; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.08);" />
  <br/>
  <em>Home Page · Movies Listing</em>
</p>

<p align="center">
  <img src="screenshots/movieDetails.png" width="42%"
       style="border:1px solid #e5e7eb; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.08);" />
  <img src="screenshots/trailers.png" width="42%"
       style="border:1px solid #e5e7eb; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.08);" />
  <br/>
  <em>Movie Details · Trailers</em>
</p>

<p align="center">
  <img src="screenshots/seatLayout.png" width="42%"
       style="border:1px solid #e5e7eb; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.08);" />
  <img src="screenshots/paymentpage.png" width="42%"
       style="border:1px solid #e5e7eb; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.08);" />
  <br/>
  <em>Seat Selection · Stripe Payment</em>
</p>

<p align="center">
  <img src="screenshots/listShows.png" width="42%"
       style="border:1px solid #e5e7eb; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.08);" />
  <img src="screenshots/addshows.png" width="42%"
       style="border:1px solid #e5e7eb; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.08);" />
  <br/>
  <em>Admin Show Management</em>
</p>

<p align="center">
  <img src="screenshots/admin.png" width="42%"
       style="border:1px solid #e5e7eb; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.08);" />
  <br/>
  <em>Admin Dashboard</em>
</p>


---

## 📁 Project Structure

```text
quickflick/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   ├── utils/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── utils/
│   └── main.jsx
│
├── screenshots/
├── .env.example
└── README.md

```

## 🏗️ Architecture Overview

```text
Client (React)
      │
      ▼
Backend (Express)
      │
 ┌────┼───────────────┐
 │    │               │
MongoDB Stripe API   TMDB API
 │
 ▼
Brevo SMTP (Emails)

```

🔄 Application Flow

Booking Flow

1. User selects movie, showtime, and seats
2. Backend locks seats temporarily
3. Stripe checkout session is created
4. Payment succeeds → booking confirmed
5. Confirmation email is sent
6. Unpaid bookings expire after 10 minutes

⚙️ Environment Variables

Backend (backend/.env)

```text

MONGO_URI=your_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_secret_key
SMTP_USER=apikey
SMTP_PASS=your_brevo_smtp_key
SENDER_EMAIL=your_verified_sender_email

```

Frontend (frontend/.env)

```text

VITE_API_URL=your_backend_url
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_TMDB_API_KEY=your_tmdb_api_key

```

🧩 Design Principles

• RESTful API design

• Clear separation of concerns

• Secure payment workflows

• Scalable data models

• Concurrency-safe seat handling

• Production-ready error handling


🔮 Future Enhancements

• Seat category pricing (Gold / Silver / Platinum)

• Coupons and offers

• QR-code based ticket validation

• Progressive Web App (PWA)

🙌 Acknowledgements


• Movie data powered by TMDB API

• Inspired by GreatStack MERN Movie Booking Series

• Built and extended by Suraj M

📜 License


This project is licensed under the MIT License.


