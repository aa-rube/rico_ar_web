// src/global.d.ts

export {};

declare global {
  interface ThemeParams {
    // Define properties of theme parameters if needed
  }

  interface MainButton {
    text: string;
    isVisible: boolean;
    // Add other properties and methods
  }

  interface TelegramWebApp {
    WebApp: {
      initData: string;
      initDataUnsafe: any;
      version: string;
      platform: string;
      colorScheme: 'light' | 'dark';
      themeParams: ThemeParams;
      isExpanded: boolean;
      viewportHeight: number;
      viewportStableHeight: number;
      isClosingConfirmationEnabled: boolean;
      headerColor: string;
      backgroundColor: string;

      // Methods
      ready(): void;
      close(): void;
      expand(): void;
      enableClosingConfirmation(): void;
      disableClosingConfirmation(): void;

      // Objects
      MainButton: MainButton;
      // Add other methods, properties, and objects you use
    };
  }

  interface Window {
    Telegram: TelegramWebApp;
  }
}
