# PlacementPro – AI Interview Preparation Portal

PlacementPro is a complete, production-ready, full-stack MERN application designed as an interview preparation portal. It features aptitude quizzes, technical subject challenges, data structures and algorithms practice guides, fully responsive custom coding environments, and mock interview simulators with progress dashboards.

---

## Technical Architecture & Stack

### Frontend
- **Framework**: React 18 (bootstrapped with Vite)
- **Styling**: Tailwind CSS v3 with customized color schemes (vibrant Indigo & Violet theme), custom animations (pulse glow, floating elements, shimmer effects), and glassmorphism.
- **Routing**: React Router DOM (v6) with path guards (`ProtectedRoute.jsx`) and lazy loading.
- **Charts**: Chart.js (`react-chartjs-2`) for visual daily/weekly logs, accuracy metrics, and strength indices.
- **HTTP Client**: Axios with interceptors for attaching JWTs and auto-logout on token expiration.

### Backend
- **Framework**: Node.js & Express.js.
- **Security**: Helmet, CORS, Rate Limiting (`express-rate-limit`), and Morgan logging.
- **Auth**: JSON Web Tokens (JWT) & Bcrypt password hashing.
- **Validation**: Strict schema filters and request parsing via `express-validator`.

### Database
- **Provider**: MongoDB Atlas (relational-like models handled via Mongoose schemas).
- **Collections**:
  - `User`: Handles account, streaks, badges list, solved counters, and password resets.
  - `Question`: Flexible questions storage (MCQs, coding challenges, subjective interview cues).
  - `Result`: Quiz/mock interview scorecard histories.
  - `Progress`: Compound indexed daily logs representing question counts and performance.

---

## Directory Structure

```text
├── client/
│   ├── public/              # Favicon SVG
│   ├── src/
│   │   ├── assets/
│   │   ├── components/      # Navbar, Sidebar, Card, Loader, ProgressChart, Timer, Modal
│   │   ├── constants/       # Topics, FAQS, badges definitions
│   │   ├── context/         # AuthContext, ThemeContext
│   │   ├── hooks/           # useAuth, useTheme, useTimer, useQuestions
│   │   ├── layouts/         # MainLayout, DashboardLayout
│   │   ├── pages/           # Home, Dashboard, Aptitude, Technical, DSA, Coding, MockInterview, Profile, Analytics, NotFound
│   │   ├── services/        # Axios API instances, progress calls
│   │   ├── utils/           # Time calculators, class styling utilities
│   │   ├── App.jsx          # Route paths
│   │   ├── main.jsx         # Global context wrapper
│   │   └── index.css        # Tailwind directives and utility classes
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js       # Proxy configurations
│   └── vercel.json          # SPA routing config
│
├── server/
│   ├── config/              # db connection utilities
│   ├── controllers/         # Authentication, Question fetch, Result submissions, Analytics compilers
│   ├── middleware/          # Authorization checks, Express validations, Error handler filters
│   ├── models/              # User, Question, Result, Progress
│   ├── routes/              # Express Router boundaries
│   ├── utils/               # custom error models, token emitters
│   ├── Procfile             # Render execution process
│   ├── seed.js              # 75+ real interview question seed script
│   └── server.js            # Express app entry
```

---

## Getting Started

### Prerequisites
- Node.js installed (v18 or higher recommended)
- MongoDB running locally or a MongoDB Atlas connection string

### 1. Database & Backend Configuration
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file using the example:
   ```bash
   cp .env.example .env
   ```
4. Set your actual `MONGO_URI` (Atlas or Local Mongo connection) and a secure `JWT_SECRET` string in the `.env` file.
5. Populate the database with the prebuilt question bank (75+ real MCQs, DSA and coding questions):
   ```bash
   npm run seed
   ```
6. Start the server in development mode:
   ```bash
   npm run dev
   ```
   *The server runs on http://localhost:5000 by default.*

### 2. Frontend Configuration
1. Navigate to the client folder:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file using the example:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   *Vite starts the interface at http://localhost:5173.*

---

## Seed Credentials
Once you run the database seed script, you can log in using these preset credentials:

- **Demo Student Account:**
  - Email: `demo@placementpro.com`
  - Password: `demo123456`
- **Admin Account:**
  - Email: `admin@placementpro.com`
  - Password: `admin123456`

---

## Production Deployment

### Frontend (Vite & React) on Vercel
1. Import your repository into Vercel.
2. Select the `client` folder as the root directory.
3. Configure build commands:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Set the environment variable `VITE_API_URL` to point to your live backend domain (e.g. `https://your-backend.render.com/api`).
5. Vercel automatically reads `vercel.json` and forwards SPA routes to `index.html`.

### Backend (Express & Node) on Render
1. Create a new Web Service on Render.
2. Select the repository and set the root directory to `server`.
3. Build & start commands:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Define environment variables in Render's dashboard:
   - `MONGO_URI` (Your Atlas DB path)
   - `JWT_SECRET` (Secure JWT signing key)
   - `JWT_EXPIRE` (e.g., `30d`)
   - `PORT` (e.g., `5000`)
   - `CLIENT_URL` (URL of your live Vercel frontend)
   - `NODE_ENV` (`production`)
