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

export default function MyLocation() {
  const { mySubLocality } = useUsersSubLocalityQuery();
  const setMyLocation = useSetRecoilState(myLocationState);
  const [myLocationString, setMyLocationString] = useState('');
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const getMyLocationHandler = async () => {
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
    getMyLocationHandler();

    if (mySubLocality && mySubLocality.ok) {
      if (mySubLocality.isKorea) {
        setMyLocationString(mySubLocality.localityArr.slice(1).join(" "));
      } else {
        setMyLocationString(mySubLocality.localityArr[0]);
      }
    } else {
      setMyLocationString('위치를 찾을 수 없음');
    }
  }, [mySubLocality]);

  return (
    <>
      <Button style={styles.wrap} onPress={getMyLocationHandler}>
        <Ionicons name="location" size={30} color={Colors.mainWhite3} />
        <View style={styles.location}>
          <Text style={styles.text}>{myLocationString}</Text>
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
    fontSize: Size.normalBig,
    fontWeight: 'bold',
  },
});
