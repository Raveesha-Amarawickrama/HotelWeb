🏨 **Full Hotel Website**
This is a full-stack hotel booking website project with:

Backend: Node.js, Express.js, MongoDB (MERN stack)

Frontend: React.js

The backend exposes REST APIs for user authentication, room management, booking, gallery, and offers. The frontend consumes these APIs with a responsive UI for customers and admins.


**Features**
User registration/login with JWT authentication

Role-based access (user, admin)

CRUD for rooms, bookings, offers, and gallery images

File upload support (Multer + Cloudinary)

Contact form handling

Email notifications via Nodemailer

Error handling & validation middleware



**Setup**

cd hotel-backend
npm install
Create .env file based on .env.example:

ini
Copy code
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hotel
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

Run server:

npm run dev
API base URL: http://localhost:5000/api

**Frontend (React)**
Features
User registration and login (JWT stored in memory or localStorage)

Room browsing with search and filtering

Booking creation and management

Gallery and offers display

Responsive design (mobile & desktop)

Form validation and error handling

React Router v6 for navigation

Context API for state management (Auth, Cart, etc.)

**Setup**

cd frontend
npm install
Create .env file:

VITE_API_BASE_URL=http://localhost:5000/api
Run development server:

npm run dev
# or npm start if Create React App
Open in browser:

Vite: http://localhost:5173

CRA: http://localhost:3000

**API Overview**
Endpoint	Description	Methods	Auth Required
/api/auth	Register, Login	POST	No
/api/users	List users, Profile	GET	Yes
/api/rooms	Rooms CRUD	GET, POST, PUT, DELETE	Admin for CUD
/api/bookings	Create, view, cancel bookings	GET, POST, PUT	Yes
/api/contact	Contact form submissions	POST, GET	No
/api/gallery	Gallery image upload & listing	GET, POST, DELETE	Auth for POST & DELETE
/api/offers	Offers CRUD	GET, POST, DELETE	Admin for CUD

Environment Variables
Both backend and frontend use environment variables stored in .env files.


Use Postman or similar tools to test backend APIs.

Protect admin routes with middleware checking user roles.

Store JWT tokens securely on the client (e.g., HttpOnly cookie or localStorage with care).

Use React Context or Redux for managing global auth state.

Implement loading and error UI states on frontend.

Optimize image uploads with Cloudinary for better performance.

Add unit and integration tests for backend and frontend. 




Author
Ravisha Hashani Amarawikrama
Full MERN Hotel Website Project
© 2025
