#!/usr/bin/env bash
set -euo pipefail

# Переходим в каталог со скриптом (корень проекта)
cd "$(dirname "$0")"

echo "➡️ Pull latest changes..."
git pull

echo "🛠️ Building project..."
npm run build

# Определяем имя пользователя, запустившего скрипт
if [ -n "${SUDO_USER-}" ]; then
  USERNAME="$SUDO_USER"
else
  USERNAME="$(whoami)"
fi

# В зависимости от пользователя выбираем целевую папку
case "$USERNAME" in
  weed)
    TARGET_DIR="/var/www/smokeweed.vkusbot.ru"
    ;;
  food)
    TARGET_DIR="/var/www/goodfood.vkusbot.ru"
    ;;
  *)
    TARGET_DIR="/var/www/vkusbot.ru"
    ;;
esac

echo "Копируем билд в: $TARGET_DIR"

# Создаём папку, если её нет
sudo mkdir -p "$TARGET_DIR"

# Копируем содержимое build в целевую директорию
sudo cp -r build/* "$TARGET_DIR/"

echo "✅ Файлы скопированы."

sudo systemctl reload nginx

echo "🎉 Деплой завершён."
