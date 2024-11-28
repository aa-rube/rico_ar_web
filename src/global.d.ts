// src/global.d.ts

export {};

declare global {
  interface TelegramWebApp {
    WebApp: {
      close(): void;
      // Добавьте другие методы и свойства, которые вы используете
    };
  }

  interface Window {
    Telegram: TelegramWebApp;
  }
}
