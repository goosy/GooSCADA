@echo off
setx NODE_OPTIONS --experimental-modules
set NODE_OPTIONS=--experimental-modules
call npm install
where gulp.cmd > nul
if NOT %ERRORLEVEL% == 0 call npm install gulp-cli -g
call gulp build
where pm2.cmd > nul
if NOT %ERRORLEVEL% == 0 call npm install -g pm2
rmdir /S /Q node_modules
rmdir /S /Q src
rem call npm install --production
pause
