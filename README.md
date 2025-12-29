# 🎬 QuickFlick — Movie Ticket Booking Platform

QuickFlick is a full-stack **movie ticket booking web application** built using the **MERN stack**, featuring real-time seat booking, secure payments, authentication, and automated email notifications.  
The platform supports both **user and admin workflows**, dynamic seat locking, and show data powered by the TMDB API.

🔗 **Live Demo:** https://quickflick-sigma.vercel.app

---

## 🚀 Key Features

### 👤 User Features
- Browse movies and shows fetched dynamically from **TMDB API**
- Select showtimes and choose seats in real time
- **Dynamic seat locking** during checkout
- Automatic **seat release after 10 minutes** if payment is not completed
- Secure payments using **Stripe**
- **Booking confirmation emails**
- **Show reminder emails** before the movie time
- View booking history

### 🛠 Admin Features
- Add and manage movies and shows
- Configure show timings and pricing
- View bookings and analytics
- Prevent double-booking using seat state management

---

## 🔐 Authentication & Payments
- **Clerk** for authentication and user management
- **Stripe Payment Gateway** for secure transactions
- Server-side validation for booking and payment workflows

---

## 📧 Email Automation
- Booking confirmation emails
- Automated show reminder emails
- SMTP-based transactional email system (Brevo)

---

## 🧠 Seat Management Logic
- Seats are temporarily locked when a user initiates payment
- If payment is **not completed within 10 minutes**, seats are automatically released
- Prevents race conditions and double booking

---

## 🧰 Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

### Database & APIs
![MongoDB](https://img.shields.io/badge/MongoDB-001E2B?style=for-the-badge&logo=mongodb&logoColor=47A248)
![TMDB](https://img.shields.io/badge/TMDB-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white)

### Authentication & Payments
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)

### Tools & Deployment
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-1A1A1A?style=for-the-badge&logo=render&logoColor=46E3B7)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

---

## 📸 Screenshots

_Add screenshots here to showcase the UI and features._

screenshots/
├── home.png
├── movie-details.png
├── seat-selection.png
├── payment.png
├── booking-confirmation.png
├── admin-dashboard.png

scss
Copy code

```markdown
![Home](screenshots/home.png)
![Seat Selection](screenshots/seat-selection.png)
![Payment](screenshots/payment.png)
⚙️ Environment Variables
Backend
env
Copy code
MONGO_URI=your_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_secret
SMTP_USER=apikey
SMTP_PASS=your_smtp_key
SENDER_EMAIL=your_verified_email
Frontend
env
Copy code
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_API_URL=backend_url
🔮 Future Enhancements
Seat category pricing (Gold / Silver / Platinum)

Coupon and offer system

QR-code based ticket validation

PWA support for mobile users

🙌 Acknowledgements
Movie data powered by TMDB API

Project inspired by GreatStack MERN Movie Booking series

Built and extended by Suraj M

📜 License
This project is licensed under the MIT License.
