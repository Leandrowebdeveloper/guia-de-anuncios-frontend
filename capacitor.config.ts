import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Montes belos .app',
  webDir: 'www',
  bundledWebRuntime: true,
  plugins: {
      SplashScreen: {
      backgroundColor: '#1E295C',
      launchAutoHide: true,
      launchShowDuration: 5000,
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: false,
    },
  },
};

export default config;
