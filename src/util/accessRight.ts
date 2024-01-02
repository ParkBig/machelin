import { MediaLibraryPermissionResponse, PermissionStatus as ImagePermissionStatus } from 'expo-image-picker';
import { PermissionStatus as LocationPermissionsStatus, LocationPermissionResponse } from 'expo-location';
import { CameraPermissionResponse, PermissionStatus as CameraPermissionsStatus } from 'expo-image-picker';
import { Linking, Platform } from 'react-native';

const openAppSettings = () => {
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:');
  } else {
    Linking.openSettings();
  }
};

export const verifyLocationPermissions = async (
  locationPermissionInformation: LocationPermissionResponse | null,
  requestPermission: () => Promise<LocationPermissionResponse>
) => {
  const permissionResponse = await requestPermission();

  if (locationPermissionInformation?.status === LocationPermissionsStatus.UNDETERMINED) {
    return permissionResponse.granted;
  }

  if (locationPermissionInformation?.status === LocationPermissionsStatus.DENIED) {
    return permissionResponse.granted;
  }

  return true;
};

export const verifyMediaLibraryPermissions = async (
  mediaLibraryPermissionInfo: MediaLibraryPermissionResponse | null,
  reqMediaLibraryPermission: () => Promise<MediaLibraryPermissionResponse>
) => {
  const permissionRes = await reqMediaLibraryPermission();

  if (mediaLibraryPermissionInfo?.status === ImagePermissionStatus.UNDETERMINED) {
    return permissionRes.granted;
  }

  if (mediaLibraryPermissionInfo?.status === ImagePermissionStatus.DENIED) {
    return permissionRes.granted;
  }

  return true;
};

export const verifyCameraPermissions = async (
  cameraPermissionInfo: CameraPermissionResponse | null,
  reqCameraPermission: () => Promise<CameraPermissionResponse>
) => {
  const permissionRes = await reqCameraPermission();

  if (cameraPermissionInfo?.status === CameraPermissionsStatus.UNDETERMINED) {
    return permissionRes.granted;
  }

  if (cameraPermissionInfo?.status === CameraPermissionsStatus.DENIED) {
    return permissionRes.granted;
  }

  return true;
};
