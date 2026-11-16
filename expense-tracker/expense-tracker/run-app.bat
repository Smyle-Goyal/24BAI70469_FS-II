@echo off
echo ========================================================
echo        Starting Expense Tracker Application
echo        Spring Boot Backend + React Frontend
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/2] Starting Spring Boot Backend on http://localhost:8080 ...
start "Expense Tracker Backend" cmd /k "cd /d "%~dp0backend" && mvnw.cmd spring-boot:run"

echo [2/2] Starting React Frontend on http://localhost:5173 ...
start "Expense Tracker Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo ========================================================
echo  Backend:  http://localhost:8080 (API)
echo  H2 DB:    http://localhost:8080/h2-console
echo  Frontend: http://localhost:5173
echo ========================================================
echo.
pause
