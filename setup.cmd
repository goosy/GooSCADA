@echo off
call npm install
copy node_modules\node-snap7\build\Release\node_snap7.node lib\
call npm install gulp-cli -g
call npm install -g pm2
rmdir /S /Q node_modules
call npm install --production
pause
