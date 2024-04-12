import { PermissionStatus, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { Dispatch, SetStateAction } from 'react';

const getMyLocationHandler = async (
  setMyLocation: Dispatch<SetStateAction<{ isGetLocation: boolean; latitude: number; longitude: number }>>,
  setToggleAlertModal: Dispatch<SetStateAction<{ toggle: boolean; alertMsg: string }>>
): Promise<void> => {
  const { status } = await requestForegroundPermissionsAsync();
  if (status !== PermissionStatus.GRANTED) {
    setToggleAlertModal({ toggle: true, alertMsg: '위치 접근 권한이 필요합니다' });
    return;
  }

  try {
    const getMyLocation = await getCurrentPositionAsync();
    const latitude = getMyLocation.coords.latitude;
    const longitude = getMyLocation.coords.longitude;

    setMyLocation({
      isGetLocation: true,
      latitude,
      longitude,
    });
  } catch (error) {
    setToggleAlertModal({ toggle: true, alertMsg: '위치를 찾지 못했어요' });
  }
};

export default getMyLocationHandler;
