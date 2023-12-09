import { MediaLibraryPermissionResponse, PermissionStatus as ImagePermissionStatus } from 'expo-image-picker';
import { PermissionStatus as LocationPermissionsStatus, LocationPermissionResponse } from 'expo-location';
import { CameraPermissionResponse, PermissionStatus as CameraPermissionsStatus } from 'expo-image-picker';
import { Alert, Linking, Platform } from 'react-native';

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
  if (locationPermissionInformation?.status === LocationPermissionsStatus.UNDETERMINED) {
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  }

  if (locationPermissionInformation?.status === LocationPermissionsStatus.DENIED) {
    Alert.alert('위치 접근권한이 필요합니다');
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
    Alert.alert('앨범 접근권한이 필요합니다');
    const permissionRes = await reqMediaLibraryPermission();
    return permissionRes.granted;
  }2

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
    Alert.alert('접근 권한이 필요합니다', '카메라 접근 권한을 허용해 주세요.', [
      {
        onPress: openAppSettings,
      },
    ]);
  }

  return true;
};
