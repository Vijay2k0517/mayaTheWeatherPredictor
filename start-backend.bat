@echo off
cd /d "%~dp0backend"
set PYTHONPATH=%~dp0backend
echo Starting FastAPI Backend Server...
echo Backend will be available at http://localhost:8000
echo API documentation at http://localhost:8000/docs
echo.
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
pause
