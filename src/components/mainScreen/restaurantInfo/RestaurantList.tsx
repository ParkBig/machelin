import { View, StyleSheet } from 'react-native';
import Restaurants from './Restaurants';
import { useRecoilValue } from 'recoil';
import { toggleRestaurantsListState } from 'store/toggleState';
import RepresentationResTaurant from './RepresentationResTaurant';
import { Colors } from 'const/global-styles';

export default function RestaurantList() {
  const toggleRestaurantList = useRecoilValue(toggleRestaurantsListState);

  return (
    <View style={[styles.wrap, toggleRestaurantList && styles.open]}>
      {toggleRestaurantList ? <Restaurants /> : <RepresentationResTaurant />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
  },
  open: {
    height: '70%',
    borderTopColor: Colors.mainGreen3,
    borderTopWidth: 1,
  },
});
