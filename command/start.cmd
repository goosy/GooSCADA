@echo off
call pm2 delete all
call pm2 start --name="VPLC" node -- ./lib/index.js
call pm2 logs "VPLC" --lines 200
