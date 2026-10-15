@echo off
cd /d "%~dp0"
if not exist node_modules (
  echo Installing dependencies...
  call npm install
)
echo Starting Campus Canteen at http://localhost:5173
echo To open it on your phone/tablet (same Wi-Fi), use the "Network" URL printed below.
call npm run dev -- --open
pause
