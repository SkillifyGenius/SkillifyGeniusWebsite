@echo off
setlocal EnableExtensions EnableDelayedExpansion
pushd "%~dp0" || (
    echo Could not open the Skillify Genius project folder.
    if not defined SKILLIFY_NO_PAUSE pause
    exit /b 1
)

where node >nul 2>&1 || goto :missing_node
where npm >nul 2>&1 || goto :missing_npm

if not exist "node_modules\next\package.json" if not exist "frontend\node_modules\next\package.json" (
    echo Installing project dependencies...
    call npm.cmd install
    if errorlevel 1 goto :install_failed
)

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\open-browser-when-ready.ps1" -ProbeOnly -Attempts 1 >nul 2>&1
if not errorlevel 1 (
    echo Skillify Genius is already running at http://localhost:3000/
    if not defined SKILLIFY_NO_BROWSER start "" "http://localhost:3000/"
    popd
    if not defined SKILLIFY_NO_PAUSE pause
    exit /b 0
)

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
echo Launching Next.js Frontend...
echo (The browser will open when the page is ready.)
echo.

:: Wait for a real page response before opening the default browser.
if not defined SKILLIFY_NO_BROWSER start "" /min powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%~dp0scripts\open-browser-when-ready.ps1" -Attempts 120

:: Run the frontend bound to 0.0.0.0 for LAN access
call npm.cmd run dev:frontend
set "RUN_EXIT=!errorlevel!"
if not "!RUN_EXIT!"=="0" echo Next.js stopped with exit code !RUN_EXIT!.
popd
if not defined SKILLIFY_NO_PAUSE pause
exit /b !RUN_EXIT!

:missing_node
echo Node.js was not found. Install Node.js 20 or newer, then run this file again.
goto :failed

:missing_npm
echo npm was not found. Install npm with Node.js, then run this file again.
goto :failed

:install_failed
echo Dependency installation failed. Check the npm error above and try again.
goto :failed

:failed
popd
if not defined SKILLIFY_NO_PAUSE pause
exit /b 1
