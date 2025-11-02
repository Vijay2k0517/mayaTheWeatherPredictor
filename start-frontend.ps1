# Start Frontend Server Script
Write-Host "Starting React Frontend..." -ForegroundColor Green
Write-Host "Frontend will be available at http://localhost:3002" -ForegroundColor Cyan
Write-Host "Make sure backend is running at http://localhost:8000" -ForegroundColor Yellow
Write-Host ""

$FrontendPath = Join-Path $PSScriptRoot "frontend"
Set-Location $FrontendPath
$env:PORT = 3002

npm start
