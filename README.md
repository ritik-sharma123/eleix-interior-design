# Eleix Interior Design — Full-Stack Demo

A full-stack lead-generation website + sales/admin dashboard for a fictional
premium interior design company, built with:

- **Frontend:** React 18 + Vite + Tailwind CSS + React Router + lucide-react
- **Backend:** Node.js + Express + Mongoose (MongoDB)
- **Auth:** JWT + bcrypt

The backend **automatically falls back to an in-memory mock data store** if
`MONGO_URI` isn't set or MongoDB isn't reachable, so you can run and demo the
whole app — including the admin dashboard with sample leads — with zero
database setup.

---

## 1. Project structure

```
eleix/
  backend/       Express API (auth, leads, dashboard stats)
  frontend/      React + Vite public site + admin dashboard
```

## 2. Quick start (no MongoDB required)

**Backend:**
```bash
cd backend
cp .env.example .env
npm install
npm run dev            # http://localhost:5000
```
You should see `[server] Data mode: MOCK (in-memory demo data)` in the console.

**Frontend (in a new terminal):**
```bash
cd frontend
cp .env.example .env
npm install
npm run dev             # http://localhost:5173
```

Open http://localhost:5173 for the public site.

**Admin dashboard:** go to http://localhost:5173/admin/login and sign in with
the seeded demo account:
```
Email:    admin@eleixinteriors.com
Password: ChangeMe123!
```
(This account only exists in mock mode. See below for real MongoDB setup.)

## 3. Running with real MongoDB

1. Set `MONGO_URI` in `backend/.env` to your connection string
   (e.g. `mongodb://127.0.0.1:27017/eleix_interior` or an Atlas URI).
2. Create the first admin user:
   ```bash
   cd backend
   npm run seed
   ```
   This creates an admin using `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`
   from `.env`, and seeds 4 demo leads so the dashboard isn't empty.
   **Change this password after first login.**
3. Start the backend as usual (`npm run dev`) — it will log
   `[db] Connected to MongoDB` instead of falling back to mock mode.

## 4. Environment variables

See `backend/.env.example` and `frontend/.env.example`. Key ones:

| Variable | Where | Purpose |
|---|---|---|
| `MONGO_URI` | backend | MongoDB connection string (omit for mock mode) |
| `JWT_SECRET` | backend | Secret used to sign admin login tokens |
| `CLIENT_URL` | backend | Allowed CORS origin (your frontend URL) |
| `VITE_API_URL` | frontend | Backend API base URL |
| `VITE_WHATSAPP_NUMBER` | frontend | Business WhatsApp number (digits only, country code first) |
| `VITE_BUSINESS_PHONE` / `_EMAIL` / `_ADDRESS` | frontend | Shown in footer, contact page, `tel:`/`mailto:` links |

## 5. API reference

```
POST   /api/auth/login
GET    /api/auth/me                (protected)

POST   /api/leads                  (public — consultation form, quick callback)
GET    /api/leads                  (protected — ?search=&status=&page=&limit=)
GET    /api/leads/:id              (protected — includes activity timeline)
PUT    /api/leads/:id              (protected)
DELETE /api/leads/:id              (protected)
PATCH  /api/leads/:id/status       (protected)
PATCH  /api/leads/:id/assign       (protected)
POST   /api/leads/:id/notes        (protected)

GET    /api/dashboard/stats        (protected)
GET    /api/health                 (shows current data mode)
```

## 6. Customizing for a real client

Everything client-specific is centralized so it's easy to swap out:

- **Business info / WhatsApp / phone / email / address:** `frontend/.env`
- **Services offered:** `frontend/src/data/services.js`
- **Portfolio projects:** `frontend/src/data/projects.js`
- **Testimonials:** `frontend/src/data/testimonials.js`
- **Process steps:** `frontend/src/data/process.js`
- **Colors / fonts:** `frontend/tailwind.config.js` and the Google Fonts link
  in `frontend/index.html`
- **Logo:** currently a text wordmark ("Eleix.") in `Navbar.jsx` / `Footer.jsx`
  — swap for an `<img>` when you have a real logo file
- **SEO meta / structured data / sitemap:** `frontend/index.html`,
  `frontend/public/sitemap.xml`, `frontend/public/robots.txt`

All demo images are hotlinked from Unsplash placeholders — replace with real
project photography before going live.

## 7. Known limitations / what to verify before a client demo

This was built and syntax-checked in an offline sandbox without network
access, so `npm install` and an actual `npm run dev` boot were **not**
run end-to-end here. Before presenting:

- [ ] `npm install` succeeds in both `backend/` and `frontend/`
- [ ] Both dev servers start without console errors
- [ ] Submitting the consultation form creates a lead visible in the dashboard
- [ ] Admin login works and protected routes redirect to `/admin/login` when logged out
- [ ] WhatsApp / call / email links work on a real phone
- [ ] Responsive check at 375px, 768px, 1024px, 1440px
- [ ] Swap placeholder Unsplash images for licensed/owned photography before production use
- [ ] Change the seeded admin password, and set a strong `JWT_SECRET`, before any real deployment

## 8. Security notes

- Passwords are hashed with bcrypt; never stored in plaintext.
- JWT secret and MongoDB URI are read from environment variables only —
  never hardcoded or exposed to the frontend.
- Public lead submission is rate-limited (20 requests / 15 min per IP).
- All dashboard/lead-management routes require a valid JWT.
