@echo off

rem where node > nul
rem if NOT %ERRORLEVEL% == 0 echo 没有安装Nodejs!!! && pause && exit

rem where pm2.cmd > nul
rem if NOT %ERRORLEVEL% == 0 call pnpm add pm2 -g

call pnpm install

pause