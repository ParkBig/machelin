import Button from 'components/common/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/ConfirmAlertModal';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { Colors, Shadow } from 'const/global-styles';
import { useSetRecoilState } from 'recoil';
import { mapLocationState, myLocationState } from 'store/locationState';
import { useState } from 'react';
import { PermissionStatus, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import useNearbyRestaurantsQuery from 'query/hooks/restaurants/useNearbyRestaurantsQuery';

export default function ToMyLocation() {
  const { reRestaurants } = useNearbyRestaurantsQuery();
  const setMyLocation = useSetRecoilState(myLocationState);
  const setMapLocation = useSetRecoilState(mapLocationState);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const toMyLocationHandler = async () => {
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

    reRestaurants();
  };

  return (
    <>
      <Button style={styles.button} onPress={toMyLocationHandler}>
        <Ionicons name="location" size={30} color={Colors.mainWhite3} />
      </Button>
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mainGreen2,
    borderRadius: 22.5,
    ...Shadow,
  },
});
