import { ExpoConfig } from '@expo/config';
import { config } from 'dotenv';

config();

const expoConfig: ExpoConfig = {
  name: 'machelin',
  slug: 'machelin',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './src/assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './src/assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    buildNumber: '1.0.0',
    supportsTablet: true,
  },
  android: {
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: './src/assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    permissions: ['android.permission.RECORD_AUDIO'],
    config: {
      googleMaps: {
        apiKey: 'AIzaSyAgb1saQXdlvRXGhu6mt8IRZyVmzEJBS88',
      },
    },
    package: 'com.parkbig.machelin',
  },
  web: {
    favicon: './src/assets/favicon.png',
  },
  plugins: [
    [
      'expo-image-picker',
      {
        cameraPermission: 'good work',
      },
    ],
  ],
  extra: {
    eas: {
      projectId: '4b0a610f-533a-439b-9991-951b5cd0683a',
    },
    EXPO_PROD_SERVER_URL: process.env.EXPO_PROD_SERVER_URL,
    EXPO_DEV_SERVER_URL: process.env.EXPO_DEV_SERVER_URL,
    EXPO_GOOGLE_KEY: process.env.EXPO_GOOGLE_KEY,
  },
};

export default expoConfig;
