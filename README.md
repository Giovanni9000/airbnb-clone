# Airbnb Clone

A full-stack accommodation platform I built as my capstone project at ZAIO. The brief was to replicate the Airbnb UI from a Figma design and back it with a real API. I designed the component structure, built the backend from scratch, and figured out deployment.

**Frontend (user-facing):** https://amazing-elf-290f20.netlify.app  
**Admin dashboard:** https://sunny-kleicha-d7d19c.netlify.app  
**Backend API:** https://airbnb-clone-cre0.onrender.com


## What it does

Users can browse accommodation listings, view details and pricing, and make reservations. Admins log in to a separate dashboard where they can create, edit, and delete listings with image uploads.

The main things I built:

- JWT-based auth with protected routes (frontend + backend)
- Full CRUD for listings
- Reservation system where users can book and view their bookings
- Cost calculator on the listing detail page
- Separate admin panel with its own login, listing management, and dashboard view
- Responsive layout that works on mobile and desktop


## Tech stack

**Frontend**
- React.js
- React Router 
- Axios 
- CSS

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- Multer
- bcrypt

**Deployment**
- Netlify for both frontends
- Render for backend API
- MongoDB Atlas for cloud database


## Running it locally

You'll need Node.js and a MongoDB Atlas connection string.


## What I'd improve

A few things I ran out of time on or would approach differently now:

- Search functionality on the listings page
- Better error messages on form validation
- Testing

