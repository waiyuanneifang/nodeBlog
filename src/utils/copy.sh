#!/bin/sh
cd /Users/yifanli/Documents/MyProject/nodeBloag/logs
cp access.log $(date +%Y-%m).access.log 
echo "" > access.log