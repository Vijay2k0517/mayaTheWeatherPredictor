@echo off
cd /d "%~dp0frontend"
echo Starting React Frontend...
echo Frontend will be available at http://localhost:3000
echo Make sure backend is running at http://localhost:8000
echo.
call npm start
pause
