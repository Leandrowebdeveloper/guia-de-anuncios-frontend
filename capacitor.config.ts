import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'frontend',
  webDir: 'www',
  bundledWebRuntime: true,
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#1E295C",
      androidSplashResourceName: "splash",
      // androidScaleType: "CENTER_CROP",
      //  showSpinner: true,
      // androidSpinnerStyle: "large",
      // iosSpinnerStyle: "small",
      //  spinnerColor: "#999999",
       splashFullScreen: true,
      // splashImmersive: true,
      // layoutName: "launch_screen",
      // useDialog: true,
    }
  },
};

export default config;
