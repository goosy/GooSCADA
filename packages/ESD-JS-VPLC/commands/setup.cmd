@echo off

@REM where node > nul
@REM if NOT %ERRORLEVEL% == 0 echo 没有安装Nodejs!!! && pause && exit
@REM where pm2.cmd > nul
@REM if NOT %ERRORLEVEL% == 0 call npm install -g pm2

call yarn

pause