import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadow } from 'const/global-styles';
import { useState } from 'react';
import Button from 'components/common/Button';
import KeywordsModal from 'components/machelinLankScreen/searchBar/KeywordsModal';
import { getCurrentPositionAsync } from 'expo-location';
import { useSetRecoilState } from 'recoil';
import { mapLocationState, myLocationState } from 'store/locationState';

export default function Option() {
  const [toggleKeyword, setToggleKeyword] = useState(false);
  const setMyLocation = useSetRecoilState(myLocationState);
  const setMapLocation = useSetRecoilState(mapLocationState);

  const openKeywordsHandler = () => {
    setToggleKeyword(prev => !prev);
  };

  const reloadRestaurantsListHandler = async () => {
    // 레스토랑 리스트 다시받아오기
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

  return (
    <>
      <Button style={styles.icon} onPress={reloadRestaurantsListHandler}>
        <Ionicons name="refresh-outline" size={25} color="white" />
      </Button>
      <Button onPress={openKeywordsHandler} style={styles.icon}>
        <Ionicons name="flash" size={25} color={Colors.mainWhite1} />
      </Button>
      <KeywordsModal toggleModal={toggleKeyword} openKeywordsHandler={openKeywordsHandler} />
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: 40,
    width: 40,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainGreen3,
    ...Shadow,
  },
});
