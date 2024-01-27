import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/layout/Button';
import { Colors, Shadow } from 'const/global-styles';
import { useSetRecoilState } from 'recoil';
import { mapLocationState, myLocationState } from 'store/locationState';
import { useState } from 'react';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { PermissionStatus, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { useRoute } from '@react-navigation/native';
import { UseRouter } from 'types/screenType';

export default function FunctionBar() {
  const { params } = useRoute<UseRouter<'RestaurantDetailMapScreen'>>();
  const setMyLocation = useSetRecoilState(myLocationState);
  const setMapLocation = useSetRecoilState(mapLocationState);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const toRestaurantLocationHandler = () => {
    const latitude = params.restaurantLat;
    const longitude = params.restaurantLng;

    setMapLocation(prev => ({
      ...prev,
      latitude,
      longitude,
    }));
  };

  const toMyLocationHandler = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== PermissionStatus.GRANTED) {
      setToggleAlertModal({ toggle: true, alertMsg: '위치 접근 권한이 필요합니다' });
      return;
    }

    const getMyLocation = await getCurrentPositionAsync();
    const latitude = getMyLocation.coords.latitude;
    const longitude = getMyLocation.coords.longitude;

    setMyLocation({
      isGetLocation: true,
      latitude,
      longitude,
    });

    setMapLocation(prev => ({
      ...prev,
      latitude,
      longitude,
    }));
  };

  return (
    <View style={styles.wrap}>
      <Button style={styles.button} onPress={toRestaurantLocationHandler}>
        <Ionicons name="restaurant" size={30} color={Colors.mainWhite3} />
      </Button>
      <Button style={styles.button} onPress={toMyLocationHandler}>
        <Ionicons name="location" size={30} color={Colors.mainWhite3} />
      </Button>
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 60,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    bottom: 10,
    gap: 10,
  },
  button: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mainGreen2,
    borderRadius: 25,
    ...Shadow,
  },
});
