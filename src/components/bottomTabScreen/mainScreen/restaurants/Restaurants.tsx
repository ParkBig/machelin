import { View, StyleSheet } from 'react-native';
import { useRecoilValue } from 'recoil';
import { mainScreenTogglesState } from 'store/toggleState';
import RestaurantList from './restaurantList/RestaurantList';
import RepresentationRestaurantInfo from './representationRestaurantInfo/RepresentationRestaurant';
import FunctionsBar from './functionsBar/FunctionsBar';

export default function Restaurants() {
  const { toggleRestaurantList } = useRecoilValue(mainScreenTogglesState);

  return (
    <View style={styles.wrap}>
      <FunctionsBar />
      {toggleRestaurantList ? <RestaurantList /> : <RepresentationRestaurantInfo />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
  },
});
