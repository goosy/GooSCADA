@echo off
node -v | find "v12.6." > nul
if NOT %ERRORLEVEL% == 0 node-v12.6.0-x64.msi
setx NODE_OPTIONS --experimental-modules
set NODE_OPTIONS=--experimental-modules
where pm2.cmd > nul
if NOT %ERRORLEVEL% == 0 call npm install -g pm2

rem call npm install --production

pause