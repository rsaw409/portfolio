# Portfolio Project - CLAUDE.md

## Project Overview

This is a **React-based personal portfolio website** for Rohit Saw (rsaw409), a software developer. It's a single-page application built with React 18, Vite, Redux Toolkit, React Router v6, MUI (Material UI), and Framer Motion for animations.

**Live URL:** https://portfolio.rsaw409.me
**Backend API:** https://backend.portfolio.rsaw409.me/portfolio

---

## Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend Framework** | React 18, Vite 6 |
| **State Management** | Redux Toolkit, React-Redux, Redux Logger (dev) |
| **Routing** | React Router DOM v6 |
| **UI Library** | MUI (Material UI) v5, MUI X Data Grid |
| **Animations** | Framer Motion |
| **Icons** | FontAwesome (React), MUI Icons |
| **Styling** | CSS Modules, Emotion (CSS-in-JS) |
| **Authentication** | Google OAuth (handled by backend) |
| **Build** | Vite with SVGR plugin |
| **Node** | Node 24.x |

---

## Project Structure

```
portfolio/
├── public/                 # Static assets
├── src/
│   ├── api/               # API layer (REST calls to backend)
│   │   ├── api.js         # Base URL config (prod vs dev)
│   │   ├── user.js        # User auth & profile APIs
│   │   ├── project.js     # Project CRUD APIs
│   │   ├── certificate.js # Certificate CRUD APIs
│   │   ├── education.js   # Education CRUD APIs
│   │   ├── experience.js  # Work Experience CRUD APIs
│   │   └── skill.js       # Skill CRUD APIs
│   ├── component/         # Reusable UI components
│   │   ├── circularprogessbarwithlabel/ # Circular progress for skill proficiency
│   │   ├── datatable.jsx   # MUI X DataGrid wrapper with CRUD
│   │   ├── footer/        # Footer component
│   │   ├── layout/        # Main layout with nav, drawer, animations
│   │   ├── profile/       # User profile dropdown
│   │   └── routes/        # Route configuration with auth logic
│   ├── icons/             # Custom SVG icons (Flutter logo)
│   ├── pages/             # Page components
│   │   ├── about/         # About, Education, Skills
│   │   ├── certification/ # Certifications list
│   │   ├── contact/       # Contact form
│   │   ├── project/       # Projects gallery
│   │   ├── workexperience/# Work experience timeline
│   │   ├── edit-details/  # Admin/edit pages (protected)
│   │   └── ErrorPage/     # 404/Error fallback
│   ├── redux/             # Redux store
│   │   ├── action.js      # All async thunks & actions
│   │   ├── constant.js    # Action type constants
│   │   ├── reducer.js     # Root reducer
│   │   └── store.js       # Store configuration
│   ├── utils/             # Utility functions
│   │   └── util.js        # groupBy, transformSkills, formatDate, generateUrl
│   ├── App.jsx            # Root component with Snackbar
│   ├── index.jsx          # Entry point with Provider & Router
│   └── index.css          # Global styles & CSS variables
├── index.html             # HTML template with SEO meta tags
├── vite.config.js         # Vite config (port 3001, build to /build)
├── package.json
└── README.md
```

---

## Key Features

### 1. **Multi-user Portfolio System**
- URLs follow pattern: `/{userId}/{page}` (e.g., `/rsaw409/about`)
- Falls back to default email (`rsaw409@gmail.com`) if not logged in
- Google OAuth login via backend (`/login/success`)

### 2. **Pages (Public View)**
| Route | Component | Description |
|-------|-----------|-------------|
| `/:userId/about` | `About` | Profile, bio, social links, education timeline, skills by category |
| `/:userId/workexperience` | `WorkExperience` | Timeline of work experience |
| `/:userId/certification` | `Certification` | Certificates with tags |
| `/:userId/projects` | `Projects` | Project cards with tech stack icons & links |
| `/:userId/contacts` | `Contact` | Contact form |

### 3. **Edit Pages (Authenticated User Only)**
| Route | Component | Data Managed |
|-------|-----------|--------------|
| `/:userId/about/details/edit` | `EditUserDetails` | Profile, bio, social links |
| `/:userId/about/education/edit` | `EditEducation` | Education entries |
| `/:userId/about/skill/edit` | `EditSkills` | Skills with proficiency % |
| `/:userId/workexperience/edit` | `EditExperiences` | Work experience |
| `/:userId/certificatation/edit` | `EditCertificates` | Certifications |
| `/:userId/projects/edit` | `EditProjects` | Projects with tech tags |

### 4. **DataGrid CRUD System** (`component/datatable.jsx`)
- Reusable `FullFeaturedCrudGrid` component using MUI X DataGrid
- Row editing with inline save/cancel
- Add new rows with dummy data
- Delete with confirmation dialog
- Toolbar with "Add [Entity]" button
- All edit pages wrap this via `EditDetailsPage` HOC

### 5. **State Management (Redux)**
**State Shape:**
```js
{
  projects: [],           isProjectsLoading: true,
  certificates: [],       isCertificatesLoading: true,
  skills: [],             isSkillsLoading: true,
  educations: [],         isEducationLoading: true,
  workExperiences: [],    isWorkExperiencesLoading: true,
  user: null,             isUserLoading: true,
  userFromGoogle: null,
  userFromUrl: null,
  openSnackBar: false,
  severity: "error",
  snackBarMessage: "",
  isValidView: true
}
```

**Key Actions (in `redux/action.js`):**
- `getUser(email, name)` - Fetches user + loads all related data
- `getAllProjects/Certificates/Skills/Educations/Experiences(user_id)`
- `addSkill/Certificate/Education/Experience/Project(new_row, user_id)`
- `deleteSkill/Certificate/Education/Experience/Project(row, user_id)`
- `updateUser(updatedUser, user_id)`
- `setOpenSnackBar(value, message)` - Global notifications

---

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (port 3001)
npm run dev

# Build for production (outputs to /build)
npm run build

# Preview production build
npm run preview
```

---

## Environment Configuration

**API Base URL** (in `src/api/api.js`):
```js
// Production
https://backend.portfolio.rsaw409.me/portfolio

// Development
http://localhost:3000/portfolio
```

**Vite Config** (`vite.config.js`):
- Dev server: port 3001
- Build output: `build/`
- Console/debugger stripped in production
- SVGR plugin for SVG imports as React components

---

## Authentication Flow

1. App loads → `AnimateRoutes` effect runs `loadUser()`
2. `loadUser()` calls `${base_url}/login/success` with credentials
3. **Success**: Dispatch `getUser(email, name)` + `setUserFromGoogle(user)` → redirect to `/{userId}/about`
4. **Failure**: Fallback to `rsaw409@gmail.com` → `setUserFromUrl(email)` → redirect

Google OAuth handled entirely by backend. Frontend just redirects to `${base_url}/google` for login and `${base_url}/logout` for logout.

---

## Key Utilities

**`src/utils/util.js`:**
- `groupBy(array, callbackFn)` - Groups array by key
- `transformSkills(skills)` - Groups skills by category, sorts by proficiency desc
- `formatDateYYYYMMDD(date)` - Formats Date to YYYY-MM-DD
- `generateUrl(path, email, isLoggedIn)` - Generates user-specific routes

---

## Styling Conventions

- **CSS Modules** for component-scoped styles (`index.module.css`)
- **CSS Variables** in `index.css` for theming (e.g., `--primary-color`)
- **MUI sx prop** for inline component styling
- **Framer Motion** for page transitions & micro-interactions

---

## Build & Deploy

- **Build output:** `build/` directory
- **Production API:** `https://backend.portfolio.rsaw409.me/portfolio`
- **Deploy target:** Likely static hosting (Netlify, Vercel, or similar) with backend API separate

---

## Important Notes for Development

1. **Node Version:** Requires Node 24.x (per `package.json` engines)
2. **CSRF Protection:** All mutating API calls require `X-XSRF-TOKEN` cookie (via `js-cookie`)
3. **Credentials:** API calls use `credentials: "include"` for cookies
4. **Error Handling:** All API calls return `Promise.reject(response.json())` on failure; caught in actions to show Snackbar
5. **DataGrid IDs:** Uses `mui_id` (generated via `@mui/x-data-grid-generator`) for row identity
6. **Route Params:** Email extracted from URL path (`/:emailId`) and used to derive `userId`
7. **Protected Routes:** Edit pages only accessible when `userFromGoogle` exists (checked in Layout/Profile)

---

## Common Tasks

### Adding a New Editable Entity
1. Create API file in `src/api/` (follow `project.js` pattern)
2. Add action creators in `redux/action.js` (getAll, add, delete, addDummy, removeDummy)
3. Add constants in `redux/constant.js`
4. Add cases in `redux/reducer.js`
5. Create edit page in `pages/edit-details/edit-{entity}/`
6. Add route in `component/routes/index.jsx`
7. Add nav link in `component/layout/index.jsx` (if needed)

### Modifying Styles
- Component styles: Edit corresponding `index.module.css`
- Global styles: Edit `src/index.css` (CSS variables)
- MUI theme overrides: Use `sx` prop or create theme provider

### Adding a New Page
1. Create component in `src/pages/{pageName}/index.jsx`
2. Add route in `component/routes/index.jsx`
3. Add nav link in `component/layout/index.jsx` routes array