import { useIsFocused } from '@react-navigation/native';
import AreaPicker from 'components/bottomTabScreen/regionalSearchScreen/areaPicker/AreaPicker';
import Results from 'components/bottomTabScreen/regionalSearchScreen/results/Results';
import SearchBar from 'components/bottomTabScreen/regionalSearchScreen/searchBar/SearchBar';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { Colors } from 'const/global-styles';
import { PermissionStatus, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { focusedRestaurantState, myLocationState } from 'store/locationState';

export default function RegionalSearchScreen() {
  const thisScreenIsFocused = useIsFocused();
  const setMyLocation = useSetRecoilState(myLocationState);
  const resetFocusedRestaurant = useResetRecoilState(focusedRestaurantState);
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

  useEffect(() => {
    if (thisScreenIsFocused) {
      resetFocusedRestaurant();
    }
  }, [thisScreenIsFocused]);

  return (
    <SafeAreaView style={styles.wrap}>
      <SearchBar />
      <AreaPicker />
      <Results />
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.mainWhite1,
  },
});
