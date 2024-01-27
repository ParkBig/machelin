import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { Colors, Shadow } from 'const/global-styles';
import { useSetRecoilState } from 'recoil';
import { mapLocationState, myLocationState } from 'store/locationState';
import { useState } from 'react';
import { PermissionStatus, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import StampButton from 'components/topTabScreen/myMapScreen/StampButton';

export default function ToMyLocation() {
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
      <StampButton />
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
    flexDirection: 'row',
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
