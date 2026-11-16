# 💰 Expense Tracker (Full Stack)

A modern, responsive, and full-featured **Expense Tracker** application built with **Spring Boot** (Java REST API) and **React** with **Tailwind CSS**.

---

## 🚀 Features

- ✅ **Add Income & Expenses**: Easily record incoming revenue and daily expenditures with amount, date, title, category, and optional notes.
- ✅ **Categorize Transactions**: Preset and custom categories (Food & Dining, Rent, Utilities, Transport, Entertainment, Salary, Freelance, etc.) with vibrant color-coded tags.
- ✅ **Calculate Total Balance**: Live overview cards showing Total Balance (All-Time Surplus/Deficit), Total Income, Total Expenses, and Monthly Net Savings Rate.
- ✅ **Display Monthly Expenses**:
  - Interactive month-by-month browser (previous/next month navigation).
  - Monthly expense and income summaries.
  - Category-wise expense breakdown with visual progress bars and percentage distribution.
  - 12-Month interactive trend bar chart comparing monthly expenditures across the year.
- ✅ **Filter & Search**: Instant real-time search by transaction title/notes, type (Income / Expense), and category.
- ✅ **Edit & Delete**: Full CRUD functionality with modal dialogs and confirmation.
- ✅ **CSV Export**: One-click download of all filtered transactions to a CSV spreadsheet.
- ✅ **Demo Data Pre-loaded**: Auto-seeds sample transactions on initial boot so the dashboard looks great immediately.

---

## 🛠️ Tech Stack

### Backend
- **Java 17+**
- **Spring Boot 3.3.5**
  - Spring Web (REST API)
  - Spring Data JPA (Hibernate ORM)
  - Jakarta Validation
- **H2 Database** (File-based persistence in `./data/expensedb`, persists across app restarts)
- **Maven Wrapper** included (`mvnw.cmd` / `mvnw`)

### Frontend
- **React 19**
- **Vite 7**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Lucide React** (Modern SVG icons)
- **Plus Jakarta Sans** typography

---

## 📁 Project Structure

```
D:\Full_Stack_2\expense-tracker\
├── run-app.bat                # ⚡ Double-click to launch backend & frontend together
├── start-backend.bat          # Launch only Spring Boot backend
├── start-frontend.bat         # Launch only React frontend
├── backend\
│   ├── mvnw.cmd / mvnw        # Maven Wrapper
│   ├── pom.xml                # Spring Boot dependencies & build config
│   └── src\main\
│       ├── java\com\expensetracker\
│       │   ├── ExpenseTrackerApplication.java
│       │   ├── model\         # Transaction Entity & TransactionType enum
│       │   ├── repository\    # Spring Data JPA Repository
│       │   ├── service\       # Business logic, calculations, sample seeder
│       │   ├── controller\    # REST API endpoints
│       │   ├── dto\           # Data Transfer Objects
│       │   └── config\        # CORS & Global Exception Handler
│       └── resources\
│           └── application.properties # H2 & Server port 8080 configuration
└── frontend\
    ├── package.json
    ├── vite.config.js         # Vite configuration with API proxy to port 8080
    ├── index.html
    └── src\
        ├── main.jsx
        ├── App.jsx            # Main view, filters & state management
        ├── index.css          # Tailwind CSS v4 setup
        ├── services\api.js    # API service client
        └── components\
            ├── Header.jsx               # Navigation bar & action triggers
            ├── StatsCards.jsx           # Balance & summary KPI cards
            ├── MonthlyExpenseView.jsx   # Monthly analytics & 12-month bar chart
            ├── TransactionList.jsx      # Filterable transaction table & CSV export
            ├── TransactionModal.jsx     # Add / Edit transaction modal
            └── CategoryBadge.jsx        # Category badge color renderer
```

---

## 🏃 Quick Start Instructions

### Method 1: One-Click Runner (Windows)
Double-click **`run-app.bat`** in `D:\Full_Stack_2\expense-tracker`.  
This will open two terminal windows:
1. One running the **Spring Boot API** on `http://localhost:8080`
2. One running the **React Frontend** on `http://localhost:5173`

---

### Method 2: Manual Terminal Commands

#### 1. Start the Spring Boot Backend
Open a terminal in `D:\Full_Stack_2\expense-tracker\backend`:
```powershell
.\mvnw.cmd spring-boot:run
```
The backend starts at **`http://localhost:8080`**.  
The H2 database web console is available at **`http://localhost:8080/h2-console`** (`JDBC URL: jdbc:h2:file:./data/expensedb`, Username: `sa`, Password: empty).

#### 2. Start the React Frontend
Open another terminal in `D:\Full_Stack_2\expense-tracker\frontend`:
```powershell
npm run dev
```
Open **`http://localhost:5173`** in your web browser.

---

## 🌐 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/transactions` | List transactions (supports `?type=`, `?category=`, `?month=`, `?year=`, `?search=`) |
| `POST` | `/api/transactions` | Create a new transaction |
| `GET` | `/api/transactions/{id}` | Get a single transaction by ID |
| `PUT` | `/api/transactions/{id}` | Update an existing transaction |
| `DELETE` | `/api/transactions/{id}` | Delete a transaction |
| `GET` | `/api/transactions/summary` | Get total balance, total income/expenses & monthly totals |
| `GET` | `/api/transactions/monthly-report` | Get monthly expense breakdown by category (`?month=&year=`) |
| `GET` | `/api/transactions/monthly-history` | Get 12-month expense history for trend charting (`?year=`) |
| `GET` | `/api/transactions/categories` | Get all available transaction categories |
| `POST` | `/api/transactions/reset-demo` | Re-seed sample data |
