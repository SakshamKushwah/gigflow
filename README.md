#  GigFlow – Mini Freelance Marketplace Platform

GigFlow is a full-stack freelance marketplace platform where clients can post gigs, freelancers can place bids, and hiring happens with real-time notifications.

This project was built as part of a technical assignment to demonstrate full-stack development skills including authentication, protected APIs, database relationships, and real-time communication.

---

##  Tech Stack

### Frontend
- React
- Redux Toolkit
- React Router
- Axios
- Socket.IO Client

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Socket.IO

### Deployment
- Frontend: Vercel
- Backend: Render

---

##  Features

###  Authentication
- User registration & login
- JWT-based authentication
- Token persistence using localStorage
- Protected routes for authorized actions

###  Gigs
- Gig owners can post new gigs
- View gig details
- Only gig owners can hire freelancers

###  Bids
- Freelancers can place bids on gigs
- Gig owners can view all bids
- Hire a freelancer from submitted bids

###  Real-Time Notifications
- Socket.IO integration
- Instant notification when a freelancer is hired
- Stable socket lifecycle management

---

##  Application Flow

1. User registers or logs in
2. Gig owner posts a gig
3. Freelancers place bids on the gig
4. Gig owner hires a freelancer
5. Hired freelancer receives a real-time notification

---

##  Live Demo

- **Frontend:** https://gigflow-navy.vercel.app  
- **Backend:** https://gigflow-backend-ssxm.onrender.com  

---

##  Project Structure

```bash
gigflow/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── features/
│   │   ├── pages/
│   │   ├── socket.js
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   └── server.js
│
└── README.md
