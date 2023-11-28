import ConfirmAlertModal, { ToggleState } from 'components/common/ConfirmAlertModal';
import { PermissionStatus, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Callout, Marker } from 'react-native-maps';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { mapLocationState, myLocationState } from 'store/locationState';

export default function MyLocationPing() {
  const setMapLocation = useSetRecoilState(mapLocationState);
  const [myLocation, setMyLocation] = useRecoilState(myLocationState);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== PermissionStatus.GRANTED) {
        setToggleAlertModal({ toggle: true, alertMsg: '위치 접근 권한이 필요합니다' });
        return;
      }

      const getMyLocation = await getCurrentPositionAsync();

      setMyLocation({
        isGetLocation: true,
        latitude: getMyLocation.coords.latitude,
        longitude: getMyLocation.coords.longitude,
      });
      setMapLocation(prev => ({
        ...prev,
        latitude: getMyLocation.coords.latitude,
        longitude: getMyLocation.coords.longitude,
      }));
    };

    getLocation();
  }, [setMyLocation, setMapLocation, setToggleAlertModal]);

  return (
    <>
      {myLocation.isGetLocation && (
        <Marker coordinate={{ latitude: myLocation.latitude, longitude: myLocation.longitude }} pinColor="default">
          <Callout tooltip={true}>
            <View style={{ backgroundColor: 'tomato' }}>
              <Text>내위치</Text>
            </View>
          </Callout>
        </Marker>
      )}
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </>
  );
}
