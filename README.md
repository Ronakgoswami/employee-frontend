# Employee Frontend
This is the frontend of the **Employee Management System** built using **React (with Vite)**, **MUI**, **Redux Toolkit**, and **Axios**. It supports features like employee listing, CRUD operations, and integrates with a RESTful backend.

---

## 🚀 Tech Stack
- **React 19** (via Vite)
- **MUI v7** (Material UI)
- **Redux Toolkit**
- **React Router v7**
- **Axios**
- **Day.js** (for date manipulation)
- **ESLint** (for linting)

---

## 📦 Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Ronakgoswami/employee-frontend.git
cd employee-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install Additional Required Packages
```bash
# Core dependencies
npm install @reduxjs/toolkit react-redux axios dayjs

# Material UI components and icons
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install @mui/x-date-pickers

# React Router for navigation
npm install react-router-dom

# Development dependencies
npm install --save-dev eslint @vitejs/plugin-react
```

### 4. Environment Configuration
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_TITLE=Employee Management System
```

### 5. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 6. Build for Production
```bash
npm run build
```

### 7. Preview Production Build
```bash
npm run preview
```

---

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
