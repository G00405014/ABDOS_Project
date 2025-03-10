@echo off
echo Stopping ABDOS servers...
echo.

echo Looking for running server processes...

set /a found=0

echo Stopping backend server (Python/Flask)...
taskkill /FI "WINDOWTITLE eq ABDOS Backend*" /F 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Backend server stopped successfully.
    set /a found+=1
) else (
    echo No backend server found running.
)

echo Stopping frontend server (Next.js)...
taskkill /FI "WINDOWTITLE eq ABDOS Frontend*" /F 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Frontend server stopped successfully.
    set /a found+=1
) else (
    echo No frontend server found running.
)

echo.
if %found% GTR 0 (
    echo %found% server(s) stopped successfully.
) else (
    echo No ABDOS servers were found running.
)

echo.
echo You can close this window now.
pause 