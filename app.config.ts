import { ExpoConfig } from '@expo/config';
import { config } from 'dotenv';

config();

const expoConfig: ExpoConfig = {
  name: '마슐랭',
  slug: 'machelin',
  version: '1.0.410',
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
    buildNumber: '1.0.410',
    supportsTablet: true,
    bundleIdentifier: 'com.parkbig.machelin',
    config: {
      googleMapsApiKey: process.env.EXPO_GOOGLE_IOS_MAPS_SDK_KEY,
    },
  },
  android: {
    versionCode: 28,
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
    EXPO_GOOGLE_IOS_MAPS_SDK_KEY: process.env.EXPO_GOOGLE_IOS_MAPS_SDK_KEY,
    EXPO_GOOGLE_ANDROID_MAPS_SDK_KEY: process.env.EXPO_GOOGLE_ANDROID_MAPS_SDK_KEY,
  },
};

export default expoConfig;
