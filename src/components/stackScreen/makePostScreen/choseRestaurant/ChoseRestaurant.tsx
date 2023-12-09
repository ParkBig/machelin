import { useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { UseRouter } from 'types/screen/screenType';
import HasRestaurantInfo from './HasRestaurantInfo';
import NoRestaurantInfo from './NoRestaurantInfo';
import { Colors } from 'const/global-styles';

export default function ChoseRestaurant() {
  const { params } = useRoute<UseRouter<'MakePostScreen'>>();

  return (
    <View style={styles.wrap}>
      {params.restaurantInfo ? <HasRestaurantInfo restaurantInfo={params.restaurantInfo} /> : <NoRestaurantInfo />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minHeight: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: Colors.mainGreen1,
    borderBottomWidth: 1.5,
  },
});
