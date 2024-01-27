import Header from 'components/bottomTabScreen/regionalSearchScreen/header/Header';
import Results from 'components/bottomTabScreen/regionalSearchScreen/results/Results';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { Colors } from 'const/global-styles';
import { PermissionStatus, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { myLocationState } from 'store/locationState';

export default function RegionalSearchScreen() {
  const setMyLocation = useSetRecoilState(myLocationState);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  useEffect(() => {
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

    myLocation();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.wrap}>
        <Header />
        <Results />
        <ConfirmAlertModal
          toggleModal={toggleAlertModal.toggle}
          setToggleAlertModal={setToggleAlertModal}
          alertMsg={toggleAlertModal.alertMsg}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.mainWhite1,
  },
  wrap: {
    flex: 1,
    paddingHorizontal: 10,
    gap: 10,
  }
});
