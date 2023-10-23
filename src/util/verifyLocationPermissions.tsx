import { PermissionStatus, LocationPermissionResponse } from 'expo-location';
import { Alert } from 'react-native';
import { openAppSettings } from './openAppSettings';

export const verifyLocationPermissions = async (
  locationPermissionInformation: LocationPermissionResponse | null,
  requestPermission: () => Promise<LocationPermissionResponse>
) => {
  if (locationPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
    const permissionResponse = await requestPermission();

    return permissionResponse.granted;
  }

  if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
    Alert.alert('접근거부', '앱을 사용하려면 위치정보에 접근할 수 있어야합니다.', [
      {
        onPress: openAppSettings,
      },
    ]);
    return false;
  }

  return true;
};
