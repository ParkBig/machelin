import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { Colors, Size } from 'const/global-styles';
import { PermissionStatus, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import useUsersSubLocalityQuery from 'query/hooks/users/useUsersSubLocalityQuery';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { myLocationState } from 'store/locationState';
import trimMySubLocality from 'util/ trimMySubLocality';

export default function MyLocation() {
  const { mySubLocality } = useUsersSubLocalityQuery();
  const { city, district } = trimMySubLocality(mySubLocality?.subLocality);
  const setMyLocation = useSetRecoilState(myLocationState);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const myLocation = async () => {
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
  };

  useEffect(() => {
    myLocation();
  }, [mySubLocality?.subLocality]);

  return (
    <>
      <Button style={styles.wrap} onPress={myLocation}>
        <Ionicons name="location" size={30} color={Colors.mainWhite3} />
        <View style={styles.location}>
          <Text style={styles.text}>{!city && !district ? '내위치' : `${city} ${district}`}</Text>
        </View>
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
  wrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    flex: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    color: Colors.mainWhite3,
    fontSize: Size.bigSmall,
    fontWeight: 'bold',
  },
});
