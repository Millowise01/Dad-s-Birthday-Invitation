@echo off
echo ========================================
echo   Stopping Birthday Platform Servers
echo ========================================
echo.

echo Killing processes on port 5000 (Backend)...
npx kill-port 5000

echo.
echo Killing processes on port 5173 (Frontend)...
npx kill-port 5173

echo.
echo ========================================
echo   All servers stopped!
echo ========================================
echo.
pause
