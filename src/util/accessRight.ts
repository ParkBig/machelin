import { MediaLibraryPermissionResponse, PermissionStatus as ImagePermissionStatus } from 'expo-image-picker';
import { PermissionStatus as LocationPermissionsStatus, LocationPermissionResponse } from 'expo-location';
import { CameraPermissionResponse, PermissionStatus as CameraPermissionsStatus } from 'expo-image-picker';
import messaging from '@react-native-firebase/messaging';
import { Linking, Platform } from 'react-native';

const openAppSettings = () => {
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:');
  } else {
    Linking.openSettings();
  }
};

export const verifyMessagingPermissions = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

export const verifyLocationPermissions = async (
  locationPermissionInformation: LocationPermissionResponse | null,
  requestPermission: () => Promise<LocationPermissionResponse>
) => {
  if (locationPermissionInformation?.status === LocationPermissionsStatus.UNDETERMINED) {
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  }

  if (locationPermissionInformation?.status === LocationPermissionsStatus.DENIED) {
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  }

  return true;
};

export const verifyMediaLibraryPermissions = async (
  mediaLibraryPermissionInfo: MediaLibraryPermissionResponse | null,
  reqMediaLibraryPermission: () => Promise<MediaLibraryPermissionResponse>
) => {
  if (mediaLibraryPermissionInfo?.status === ImagePermissionStatus.UNDETERMINED) {
    const permissionRes = await reqMediaLibraryPermission();
    return permissionRes.granted;
  }

  if (mediaLibraryPermissionInfo?.status === ImagePermissionStatus.DENIED) {
    const permissionRes = await reqMediaLibraryPermission();
    return permissionRes.granted;
  }

  return true;
};

export const verifyCameraPermissions = async (
  cameraPermissionInfo: CameraPermissionResponse | null,
  reqCameraPermission: () => Promise<CameraPermissionResponse>
) => {
  if (cameraPermissionInfo?.status === CameraPermissionsStatus.UNDETERMINED) {
    const permissionRes = await reqCameraPermission();
    return permissionRes.granted;
  }

  if (cameraPermissionInfo?.status === CameraPermissionsStatus.DENIED) {
    const permissionRes = await reqCameraPermission();
    return permissionRes.granted;
  }

  return true;
};
