import { View, StyleSheet, Text } from 'react-native';
import { useRecoilValue } from 'recoil';
import { mainScreenTogglesState, toggleNearbySearchState } from 'store/toggleState';
import RestaurantList from './restaurantList/RestaurantList';
import RepresentationRestaurantInfo from './representationRestaurantInfo/RepresentationRestaurant';
import FunctionsBar from './functionsBar/FunctionsBar';
import { useNetInfo } from '@react-native-community/netinfo';
import { Colors } from 'const/global-styles';

export default function Restaurants() {
  const netInfo = useNetInfo();
  const toggleNearbySearch = useRecoilValue(toggleNearbySearchState);
  const { toggleRestaurantList } = useRecoilValue(mainScreenTogglesState);

  return (
    <View style={[styles.wrap, toggleNearbySearch && styles.onNearbySearch]}>
      <FunctionsBar />
      {netInfo.isConnected ? (
        toggleRestaurantList ? (
          <RestaurantList />
        ) : (
          <RepresentationRestaurantInfo />
        )
      ) : (
        <View style={styles.netInfo}>
          <Text>인터넷 연결이 불안정합니다</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    position: 'absolute',
    zIndex: 2,
    bottom: 10,
  },
  onNearbySearch: {
    bottom: 0,
  },
  netInfo: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainWhite1,
  },
});
