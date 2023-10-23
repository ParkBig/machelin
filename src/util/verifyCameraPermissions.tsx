
import { CameraPermissionResponse, PermissionStatus } from 'expo-image-picker';
import { Alert, Linking, Platform } from 'react-native';
import { openAppSettings } from './openAppSettings';

export const verifyCameraPermissions = async (
  cameraPermissionInfo: CameraPermissionResponse | null,
  reqCameraPermission: () => Promise<CameraPermissionResponse>
) => {

  if (cameraPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
    const permissionRes = await reqCameraPermission();
    return permissionRes.granted;
  }

  if (cameraPermissionInfo?.status === PermissionStatus.DENIED) {
    Alert.alert('접근 권한이 필요합니다', '카메라 접근 권한을 허용해 주세요.', [
      {
        onPress: openAppSettings
      }
    ]);
  }

  return true;
};
