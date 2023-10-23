import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadow } from 'const/global-styles';
import { useSetRecoilState } from 'recoil';
import { mapLocationState, myLocationState } from 'store/locationState';
import { getCurrentPositionAsync } from 'expo-location';
import Button from 'components/common/Button';
import Options from '../header/Options';

export default function FunctionBar() {
  const setMyLocation = useSetRecoilState(myLocationState);
  const setMapLocation = useSetRecoilState(mapLocationState);

  const toMyLocationHandler = async () => {
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
    <View style={styles.wrap}>
      <Options />
      <Button style={styles.ionicons} onPress={toMyLocationHandler}>
        <Ionicons name="location" size={25} color="white" />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 5,
    gap: 8,
  },
  upperIcons: {
    flexDirection: 'row',
    gap: 5,
  },
  ionicons: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mainGreen3,
    borderRadius: 20,
    ...Shadow,
  },
});
