import { ExpoConfig } from '@expo/config';
import { config } from 'dotenv';

config();

const expoConfig: ExpoConfig = {
  name: '마슐랭',
  slug: 'machelin',
  version: '1.0.122',
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
    buildNumber: '1.0.122',
    supportsTablet: true,
  },
  android: {
    versionCode: 6,
    adaptiveIcon: {
      foregroundImage: './src/assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    permissions: ['android.permission.RECORD_AUDIO'],
    config: {
      googleMaps: {
        apiKey: process.env.EXPO_GOOGLE_ANDROID_MAPS_SDK_KEY,
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
    EXPO_GOOGLE_MAPS_SERVICE_KEY: process.env.EXPO_GOOGLE_MAPS_SERVICE_KEY,
  },
};

export default expoConfig;
