#!/usr/bin/env bash
cd "$(dirname "$0")"
[ -d node_modules ] || { echo "Installing dependencies..."; npm install; }
echo "Starting Campus Canteen at http://localhost:5173"
echo "To open it on your phone/tablet (same Wi-Fi), use the 'Network' URL printed below."
npm run dev -- --open
