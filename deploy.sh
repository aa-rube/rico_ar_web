#!/usr/bin/env bash
set -euo pipefail

# Переходим в каталог со скриптом (корень проекта)
cd "$(dirname "$0")"

echo "➡️ Pull latest changes..."
git pull

echo "🛠️ Building project..."
npm run build

echo "🔄 Restarting serve-rico.service..."
sudo systemctl restart serve-rico.service

echo "📖 Tailing serve-rico.service logs (CTRL+C to exit)..."
sudo journalctl -u serve-rico.service -f