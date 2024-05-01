import { MediaLibraryPermissionResponse, PermissionStatus as ImagePermissionStatus } from 'expo-image-picker';
import { PermissionStatus as LocationPermissionsStatus, LocationPermissionResponse } from 'expo-location';

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
