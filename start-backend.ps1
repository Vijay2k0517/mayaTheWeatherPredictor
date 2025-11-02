# Start Backend Server Script
Write-Host "Starting FastAPI Backend Server..." -ForegroundColor Green
Write-Host "Backend will be available at http://localhost:8000" -ForegroundColor Cyan
Write-Host "API documentation at http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host ""

$BackendPath = Join-Path $PSScriptRoot "backend"
Set-Location $BackendPath
$env:PYTHONPATH = $BackendPath

uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
