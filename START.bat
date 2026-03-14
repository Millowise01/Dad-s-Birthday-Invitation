@echo off
echo ========================================
echo   60th Birthday Celebration Platform
echo ========================================
echo.
echo Starting Backend Server...
echo.

cd backend
start cmd /k "npm start"

timeout /t 3 /nobreak > nul

echo.
echo Starting Frontend Server...
echo.

cd ..\frontend
start cmd /k "npm run dev -- --host"

echo.
echo ========================================
echo   Servers Starting...
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo Network:  http://192.168.0.100:5173
echo.
echo Admin Login:
echo   Email: admin@birthday.com
echo   Password: Admin@123
echo.
echo Press any key to exit this window...
echo (Keep the other windows open!)
echo ========================================
pause > nul
