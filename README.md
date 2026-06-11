# 📚 Nestudy — Premium Study Room Booking Platform

A full-stack web application for discovering, listing, and booking premium study rooms. Built with Next.js 16, React 19, Express.js, MongoDB, and Better Auth.

🔗 **Live Site:** https://nestudy.vercel.app

---

## ✨ Features

* 🔍 **Browse & Search Rooms** — Filter rooms by name, amenities, price range, and floor
* 🏷️ **Featured Rooms** — Explore the latest premium study spaces
* 📅 **Room Booking System** — Book study rooms by selecting a date and time slot
* ⚠️ **Conflict Detection** — Prevents overlapping bookings for the same room and time
* ❌ **Booking Cancellation** — Users can cancel their own confirmed bookings
* 🏠 **Room Management** — Owners can manage their study room listings
* ✏️ **Edit & Delete Rooms** — Full CRUD functionality for room owners
* 🔐 **Authentication & Authorization** — Secure authentication using Better Auth with JWT verification
* 📱 **Responsive Design** — Optimized for desktop, tablet, and mobile devices
* 🎨 **Smooth User Experience** — Scroll reveal animations, interactive UI, and seamless navigation

---

## 👤 Role-Based Access

### Study Room Owners

* Create new room listings
* Edit existing room information
* Delete room listings
* View and manage their own listings

### Users

* Browse available study rooms
* Search and filter rooms
* Book available study rooms
* View booking history
* Cancel confirmed bookings

---

## ⚙️ Backend Features

* JWT verification using Better Auth JWKS
* Protected API routes
* Booking conflict detection
* MongoDB-based filtering and search
* Automatic booking count updates
* Owner-specific room management
* Secure CRUD operations
* RESTful API architecture

---

## 🏗️ Architecture

```text
┌─────────────┐
│    User     │
└──────┬──────┘
       ↓
┌─────────────┐
│   Next.js   │
│  Frontend   │
└──────┬──────┘
       ↓
┌─────────────┐
│   Express   │
│   Backend   │
└──────┬──────┘
       ↓
┌─────────────┐
│ MongoDB     │
│ Atlas       │
└─────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

| Technology                  | Purpose                         |
| --------------------------- | ------------------------------- |
| Next.js 16                  | React framework with App Router |
| React 19                    | User Interface Library          |
| HeroUI                      | UI Component Library            |
| Tailwind CSS v4             | Utility-First Styling           |
| Better Auth                 | Authentication                  |
| Swiper.js                   | Banner Carousel                 |
| React Icons                 | Icon Library                    |
| React Toastify              | Toast Notifications             |
| React Intersection Observer | Scroll Reveal Animations        |

### Backend

| Technology         | Purpose                           |
| ------------------ | --------------------------------- |
| Node.js            | JavaScript Runtime                |
| Express.js         | REST API Server                   |
| MongoDB            | Database                          |
| Better Auth (JWKS) | Authentication & JWT Verification |

---

## 📁 Project Structure

```text
src
├── app
│   ├── about
│   ├── add-room
│   ├── all-rooms
│   │   └── [id]
│   ├── api
│   │   └── auth
│   │       └── [...all]
│   │           └── route.js
│   ├── login
│   ├── my-bookings
│   ├── my-listings
│   ├── signup
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   ├── loading.jsx
│   ├── not-found.jsx
│   └── page.js
│
├── assets
│
├── component
│   ├── homePage
│   │   ├── banner
│   │   │   ├── Banner.jsx
│   │   │   ├── Slide-1.jsx
│   │   │   ├── Slide-2.jsx
│   │   │   ├── Slide-3.jsx
│   │   │   ├── Slide-4.jsx
│   │   │   ├── Slide-5.jsx
│   │   │   ├── Slide-6.jsx
│   │   │   └── Slides-7.jsx
│   │   ├── FeaturedSection.jsx
│   │   ├── MembershipPage.jsx
│   │   ├── ReviewPage.jsx
│   │   ├── ScrollReveal.jsx
│   │   └── WhyChoosePage.jsx
│   │
│   ├── shared
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   │
│   ├── BookingCard.jsx
│   ├── BookRoomModal.jsx
│   ├── CancelBookingButton.jsx
│   ├── DeleteRoomAlert.jsx
│   ├── EditRoomModal.jsx
│   └── RoomCard.jsx
│
└── lib
    ├── auth-client.js
    ├── auth.js
    └── proxy.js
```

---

## 🚀 Getting Started

### Prerequisites

Before running the project locally, make sure you have:

* Node.js 18+
* MongoDB Atlas (or a local MongoDB instance)
* Nestudy Backend Server running

### Clone the Repository

```bash
git clone https://github.com/your-username/nestudy.git
cd nestudy
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SERVER_URI=http://localhost:5000
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
```

### Run the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

in your browser.

---

## 📜 Available Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| npm run dev   | Start development server |
| npm run build | Create production build  |
| npm start     | Start production server  |

---

## 🌐 Deployment

### Frontend

https://nestudy.vercel.app

### Backend

Add your backend deployment URL here.

Both frontend and backend are deployed separately and communicate through REST APIs.

---

## 📦 Key Dependencies

* Next.js 16
* React 19
* Better Auth
* MongoDB
* HeroUI
* Tailwind CSS v4
* Swiper.js
* React Toastify
* React Icons
* React Intersection Observer

---

## 📄 License

This project was developed for educational and learning purposes.
