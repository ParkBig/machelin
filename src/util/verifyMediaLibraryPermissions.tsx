import { MediaLibraryPermissionResponse, PermissionStatus } from 'expo-image-picker';
import { Alert } from 'react-native';
import { openAppSettings } from './openAppSettings';

export const verifyMediaLibraryPermissions = async (
  mediaLibraryPermissionInfo: MediaLibraryPermissionResponse | null,
  reqMediaLibraryPermission: () => Promise<MediaLibraryPermissionResponse>
) => {
  if (mediaLibraryPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
    const permissionRes = await reqMediaLibraryPermission();
    return permissionRes.granted;
  }

  if (mediaLibraryPermissionInfo?.status === PermissionStatus.DENIED) {
    Alert.alert('접근 권한이 필요합니다', '앨범 접근 권한을 허용해주세요.', [
      {
        onPress: openAppSettings
      }
    ]);
    return false
  }

  return true;
};
