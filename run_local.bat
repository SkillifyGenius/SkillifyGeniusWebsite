@echo off
setlocal enabledelayedexpansion
title Skillify Genius 2.0 - Local Dev Server ^& LAN Preview

:: Detect primary local IPv4 address using native ipconfig
set LOCAL_IP=127.0.0.1
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /c:"IPv4 Address" /c:"IP Address"') do (
    set "RAW_IP=%%A"
    set "RAW_IP=!RAW_IP: =!"
    if not "!RAW_IP!"=="" (
        if "!LOCAL_IP!"=="127.0.0.1" (
            set "LOCAL_IP=!RAW_IP!"
        )
    )
)

cls
echo ==============================================================================
echo    SKILLIFY GENIUS 2.0 -- LOCAL TESTING ^& LAN PREVIEW
echo ==============================================================================
echo.
echo   [FRONTEND WEB APPLICATION]
echo   -- Local Browser:       http://localhost:3000
echo   -- Mobile / Tablet LAN: http://!LOCAL_IP!:3000
echo.
echo   [APPWRITE BAAS INTEGRATION]
echo   -- Project:             Skillify Genius - EdTech (6aa5f4880020ee2b7f5b)
echo   -- Endpoint:            https://api.attanjil.com/v1
echo.
echo   --------------------------------------------------------------------------
echo   [TIP] Connect your phone/tablet to the same Wi-Fi network and open:
echo         http://!LOCAL_IP!:3000
echo ==============================================================================
echo.
echo Launching Vite React Frontend...
echo (Opening http://localhost:3000 in your browser...)
echo.

:: Open default browser after a brief delay in background
start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:3000"

:: Run the frontend bound to 0.0.0.0 for LAN access
npm run dev

pause
