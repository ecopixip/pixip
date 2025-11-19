#!/bin/bash
# Atualiza o projeto e reinicia backend + frontend

echo "📥 Atualizando repositório..."
git pull origin main

echo "📦 Instalando dependências backend..."
cd backend
npm install
cd ..

echo "📦 Instalando dependências frontend..."
cd frontend
npm install
npm run build
cd ..

echo "🔄 Reiniciando backend via PM2..."
pm2 restart backend || pm2 start backend/app.js --name backend

echo "✅ Deploy PIXIP concluído!"
