import { PermissionStatus, LocationPermissionResponse } from 'expo-location';

export const verifyLocationPermissions = async (
  locationPermissionInformation: LocationPermissionResponse | null,
  requestPermission: () => Promise<LocationPermissionResponse>
) => {
  if (locationPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
    const permissionResponse = await requestPermission();

    return permissionResponse.granted;
  }

  if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
    return false;
  }

  return true;
};
