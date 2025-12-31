#!/bin/bash
set -e

echo "===== DEPLOYMENT STARTED ====="

echo "Pulling latest code..."
git pull origin main

echo "----- Backend -----"
cd packages/server
bun install
pm2 restart Summariser

echo "----- Frontend -----"
cd ../client
bun install
bun run build

echo "Deploying frontend to Nginx..."
sudo rm -rf /var/www/summariser/*
sudo cp -r dist/* /var/www/summariser/

echo "===== DEPLOYMENT COMPLETED ====="
