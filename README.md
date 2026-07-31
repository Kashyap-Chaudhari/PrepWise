# PrepWise – AI-Powered Full-Stack Interview Preparation Portal

PrepWise is a production-ready, full-stack MERN application engineered to prepare software developers and students for technical interviews, aptitude assessments, subject-matter tests, DSA coding challenges, and timed mock interviews with real-time performance analytics.

---

## 🌟 Key Features

### 1. 🧮 Aptitude & Logical Reasoning Module
- Comprehensive question bank covering Quantitative Aptitude, Logical Reasoning, Verbal Ability, and Data Interpretation.
- Timed practice quizzes with instant feedback, explanations, and score tracking.

### 2. 💻 Technical Core Subject Practice
- Practice modules covering core computer science domains:
  - Operating Systems (OS)
  - Database Management Systems (DBMS) & SQL
  - Computer Networks (CN)
  - Object-Oriented Programming (OOP)
  - System Design & Web Development (JavaScript, React, Node.js, Python)
- Interactive multiple-choice and conceptual assessment modes.

### 3. 🌳 Data Structures & Algorithms (DSA) Hub
- Categorized practice modules for key DSA topics:
  - Arrays, Strings, Linked Lists
  - Stacks, Queues, Trees, Graphs
  - Dynamic Programming, Greedy Algorithms, Sorting & Searching
- Code snippets, time/space complexity analysis, and detailed solution walkthroughs.

### 4. ⚡ Interactive Coding Sandbox
- Built-in custom dynamic code editor with problem descriptions, constraints, input/output test cases, hints, and immediate evaluation.
- Live execution simulator supporting multiple test cases and difficulty tiers.

### 5. 🎯 Timed Mock Interview Simulator
- Customizable mock interview sessions (Custom duration, difficulty level, and subject target).
- Real-time countdown timer with auto-submit on expiry.
- Instant scorecard with topic-level breakdown, correct/wrong responses, accuracy rating, and improvement suggestions.

### 6. 📊 Analytics & Progress Dashboard
- Powered by `Chart.js` (`react-chartjs-2`) for dynamic visual metrics.
- Streaks counter and daily activity logging via compound indexed MongoDB collections.
- Category accuracy breakdown (Aptitude, Technical, DSA) and strength/weakness analysis.

### 7. 👤 User Profile & Gamification
- Dynamic streak tracking (consecutive daily practice rewards).
- Achievement badge system unlocked through platform milestones.
- Bookmarking / Favorites system to save tricky questions for future review.
- Account details management and password security updates.

---

## 🛠️ Technical Architecture & Stack

### **Frontend**
- **Framework**: React 18 (bootstrapped with Vite for fast bundling & hot module replacement)
- **Styling**: Tailwind CSS v3 (custom theme palette, glassmorphism UI, gradient accents)
- **Animations**: Framer Motion & CSS keyframe micro-interactions
- **Icons**: React Icons (`react-icons`)
- **Notifications**: React Hot Toast (`react-hot-toast`)
- **Charts**: Chart.js with `react-chartjs-2` wrapper
- **Routing**: React Router DOM v6 with lazy loading (`React.lazy`, `Suspense`) and route protection (`ProtectedRoute`)
- **HTTP Client**: Axios with request/response interceptors for JWT header attachment and standard error handling

### **Backend**
- **Runtime & Framework**: Node.js (ES Modules `type: "module"`) & Express.js
- **Database ORM**: Mongoose v8 (MongoDB Atlas integration)
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) & Bcrypt password hashing (`bcryptjs`)
- **Security**:
  - `helmet`: Cross-Origin resource policy and HTTP header hardening
  - `cors`: Configured origin controls for production and local environments
  - `express-rate-limit`: Global API rate limiting (100 reqs / 15 mins) and strict auth rate limiting (20 reqs / 15 mins)
- **Validation**: `express-validator` schema validation middleware
- **Logging**: `morgan` HTTP request logger

---

## 📁 Directory Structure

```text
prepwise/
├── client/                      # React Frontend (Vite)
│   ├── public/                  # Public static assets & favicon
│   ├── src/
│   │   ├── assets/              # Static media & illustrations
│   │   ├── components/          # Reusable UI Components
│   │   │   ├── Button.jsx       # Custom themed button component
│   │   │   ├── Card.jsx         # Glassmorphism container card
│   │   │   ├── Footer.jsx       # Global application footer
│   │   │   ├── Input.jsx        # Styled text/password input fields
│   │   │   ├── Loader.jsx       # Full-screen & component loading spinners
│   │   │   ├── Modal.jsx        # Reusable overlay modal component
│   │   │   ├── Navbar.jsx       # Main navigation header with responsive mobile drawer
│   │   │   ├── ProgressChart.jsx# Chart.js visual representation component
│   │   │   ├── ProtectedRoute.jsx# Auth wrapper guarding private routes
│   │   │   ├── QuestionCard.jsx # Quiz question card with options & explanations
│   │   │   ├── Sidebar.jsx      # Dashboard sidebar navigation menu
│   │   │   └── Timer.jsx        # Quiz/Mock countdown timer component
│   │   ├── constants/           # Topics list, badge definitions, FAQ contents
│   │   ├── context/             # React Context Providers (AuthContext, ThemeContext)
│   │   ├── hooks/               # Custom hooks (useAuth, useTheme, useTimer, useQuestions)
│   │   ├── layouts/             # Page Layout wrappers (MainLayout, DashboardLayout)
│   │   ├── pages/               # Route view components
│   │   │   ├── Analytics.jsx    # User statistics & historical charts
│   │   │   ├── Aptitude.jsx     # Aptitude practice & quiz interface
│   │   │   ├── Coding.jsx       # Code editor and execution sandbox
│   │   │   ├── Dashboard.jsx    # Central student dashboard & recommendations
│   │   │   ├── DSA.jsx          # Data Structures & Algorithms directory
│   │   │   ├── Home.jsx         # Landing page with hero banner & features
│   │   │   ├── Login.jsx        # User login portal
│   │   │   ├── MockInterview.jsx# Timed mock interview setup & simulator
│   │   │   ├── NotFound.jsx     # 404 error page
│   │   │   ├── Profile.jsx      # User profile, badges & settings
│   │   │   ├── Register.jsx     # User registration portal
│   │   │   └── Technical.jsx    # CS subject practice interface
│   │   ├── services/            # API service calls (auth, questions, results, progress)
│   │   ├── utils/               # Formatting functions, class concatenation utilities
│   │   ├── App.jsx              # Router entry point with lazy loading
│   │   ├── main.jsx             # React entry point with Context providers
│   │   └── index.css            # Global CSS, Tailwind imports, custom animations
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js           # Vite server settings & proxy rules
│   └── vercel.json              # Vercel deployment configuration
│
└── server/                      # Express Backend API
    ├── config/                  # Database connection setup (`db.js`)
    ├── controllers/             # Request handling logic
    │   ├── authController.js    # Register, login, profile management, password resets
    │   ├── progressController.js# Streaks calculation, daily progress & analytics
    │   ├── questionController.js# Question fetching, filtering, creation, bookmarking
    │   └── resultController.js  # Result submissions & leaderboard compiling
    ├── middleware/              # Auth protection, admin check, validation, error handler
    │   ├── auth.js              # `protect` and `authorize` middleware
    │   ├── errorHandler.js      # Global error processing
    │   └── validate.js          # Express-validator rules
    ├── models/                  # Mongoose Schema Definitions
    │   ├── Progress.js          # Daily user progress tracking
    │   ├── Question.js          # MCQ, DSA, and Coding question schemas
    │   ├── Result.js            # Quiz and Mock Test result logs
    │   └── User.js              # User details, streaks, badges, bookmarks
    ├── routes/                  # Express Router Modules
    │   ├── authRoutes.js        # `/api/auth` endpoints
    │   ├── progressRoutes.js    # `/api/progress` endpoints
    │   ├── questionRoutes.js    # `/api/questions` endpoints
    │   └── resultRoutes.js      # `/api/results` endpoints
    ├── utils/                   # Error helper, JWT helper & dataset generator
    │   ├── errorResponse.js     # Custom Error class wrapper
    │   ├── generateDataset.js   # Comprehensive question bank dataset generator
    │   └── sendToken.js         # JWT cookie/JSON token helper
    ├── Procfile                 # Deployment process command for cloud hosts
    ├── seed.js                  # Comprehensive database seeding script (75+ prep items)
    └── server.js                # Express app initialization & server entry
```

---

## 📡 API Endpoints Reference

### **Authentication (`/api/auth`)**
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new student account |
| `POST` | `/api/auth/login` | Public | Authenticate user & receive JWT token |
| `POST` | `/api/auth/forgot-password` | Public | Request password reset |
| `GET` | `/api/auth/profile` | Protected | Fetch current user profile details |
| `PUT` | `/api/auth/profile` | Protected | Update user profile details |
| `PUT` | `/api/auth/change-password` | Protected | Change existing account password |

### **Questions & Content (`/api/questions`)**
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/questions` | Public | Get filtered questions (category, difficulty, topic) |
| `GET` | `/api/questions/subject/:subject` | Public | Get questions specific to a subject |
| `GET` | `/api/questions/daily-challenge` | Protected | Fetch today's featured challenge question |
| `GET` | `/api/questions/user/favorites` | Protected | Fetch user's bookmarked questions |
| `GET` | `/api/questions/:id` | Public | Get single question details |
| `POST` | `/api/questions/:id/bookmark` | Protected | Toggle bookmark status for a question |
| `POST` | `/api/questions` | Admin | Create a new question entry |
| `PUT` | `/api/questions/:id` | Admin | Update an existing question entry |
| `DELETE` | `/api/questions/:id` | Admin | Delete a question entry |

### **Results & Leaderboards (`/api/results`)**
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/results/leaderboard` | Public | Fetch top student rankings |
| `POST` | `/api/results` | Protected | Submit quiz / mock interview scorecard |
| `GET` | `/api/results` | Protected | Fetch user's submission history |

### **Progress & Analytics (`/api/progress`)**
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/progress` | Protected | Fetch user's daily progress logs & streak status |
| `GET` | `/api/progress/analytics` | Protected | Fetch category performance & strength metrics |

### **Health Check (`/api/health`)**
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | Returns API status, environment & timestamp |

---

## ⚙️ Environment Variables

### **Server Environment (`server/.env`)**
```env
# Database Connection
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/prepwise?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d

# Server Configuration
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### **Client Environment (`client/.env`)**
```env
# Backend API Base URL
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed (`v18.x` or higher recommended)
- MongoDB running locally or a MongoDB Atlas connection string

### 1. Database & Backend Setup
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file using the template:
   ```bash
   cp .env.example .env
   ```
4. Configure your `MONGO_URI` and `JWT_SECRET` in `.env`.
5. Seed the database with default accounts and 75+ interview questions:
   ```bash
   npm run seed
   ```
6. Start the server:
   ```bash
   npm run dev
   ```
   *Server runs at `http://localhost:5000`.*

### 2. Frontend Setup
1. Navigate to the client folder:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file using the template:
   ```bash
   cp .env.example .env
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *Client application starts at `http://localhost:5173`.*

---

## 🔐 Seed Credentials

Once the database seed script completes (`npm run seed`), login using either preset account:

- **Demo Student Account:**
  - Email: `demo@prepwise.com`
  - Password: `demo123456`

- **Admin Account:**
  - Email: `admin@prepwise.com`
  - Password: `admin123456`

---

## 🌐 Production Deployment

### **Frontend (Vite & React) on Vercel**
1. Import repository into Vercel.
2. Set `client` as the Root Directory.
3. Configure Build Settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Set environment variable: `VITE_API_URL=https://your-backend.render.com/api`
5. Vercel automatically reads `client/vercel.json` for SPA routing.

### **Backend (Express & Node) on Render**
1. Create a Web Service on Render targeting the `server` directory.
2. Build & Start commands:
   - Build Command: `npm install`
   - Start Command: `npm start`
3. Environment variables:
   - `MONGO_URI`: Your MongoDB Atlas URI
   - `JWT_SECRET`: Secure secret key
   - `JWT_EXPIRE`: `30d`
   - `PORT`: `5000`
   - `CLIENT_URL`: `https://your-app.vercel.app`
   - `NODE_ENV`: `production`

---

## 📄 License
This project is open source and licensed under the [MIT License](LICENSE).
