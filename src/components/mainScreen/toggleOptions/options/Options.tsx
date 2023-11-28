import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadow } from 'const/global-styles';
import { useState } from 'react';
import Button from 'components/common/Button';
import KeywordsModal from 'components/machelinLankScreen/searchBar/KeywordsModal';
import { PermissionStatus, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { useSetRecoilState } from 'recoil';
import { mapLocationState, myLocationState } from 'store/locationState';
import ConfirmAlertModal, { ToggleState } from 'components/common/ConfirmAlertModal';
import useNearbyRestaurantsQuery from 'query/hooks/restaurants/useNearbyRestaurantsQuery';
import Keywords from './Keywords';

export default function Options() {
  const { reRestaurants } = useNearbyRestaurantsQuery();
  const setMyLocation = useSetRecoilState(myLocationState);
  const setMapLocation = useSetRecoilState(mapLocationState);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const reloadRestaurantsListHandler = async () => {
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
      <Button style={styles.icon} onPress={reloadRestaurantsListHandler}>
        <Ionicons name="refresh-outline" size={30} color={Colors.mainWhite3} />
      </Button>
      <Keywords />
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: 50,
    width: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainGreen2,
    ...Shadow,
  },
});
