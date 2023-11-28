import { StyleSheet, View, ViewBase } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { focusedRestaurantState, mapLocationState } from 'store/locationState';
import { IRestaurantInfo } from 'types/data/restaureant';
import { Colors } from 'const/global-styles';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screen/screenType';
import Button from 'components/common/Button';
import BriefRestaurantInfo from '../common/BriefRestaurantInfo';

interface Props {
  restaurant: IRestaurantInfo;
}

export default function RestaurantInfo({ restaurant }: Props) {
  const { navigate } = useNavigation<UseNavigation<'MainScreen'>>();
  const setMapLocation = useSetRecoilState(mapLocationState);
  const [focusedRestaurant, setFocusedRestaurant] = useRecoilState(focusedRestaurantState);

  const restaurantChoiceHandler = () => {
    const { lat, lng } = restaurant.geometry.location;
    setMapLocation(prev => ({
      ...prev,
      latitude: lat - 0.0045,
      longitude: lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }));
    setFocusedRestaurant({
      isFocused: true,
      id: restaurant.place_id,
      latitude: lat,
      longitude: lng,
    });
  };

  const goToDetailRestaurantInfoHandler = () => {
    const { lat, lng } = restaurant.geometry.location;
    setFocusedRestaurant({
      isFocused: true,
      id: restaurant.place_id,
      latitude: lat,
      longitude: lng,
    });
    navigate('RestaurantDetailScreen', {
      restaurantName: restaurant.name,
      restaurantId: restaurant.place_id,
    });
  };

  return (
    <Button
      style={{
        ...styles.wrap,
        backgroundColor: focusedRestaurant.id === restaurant.place_id ? Colors.lightGray : Colors.mainWhite1,
      }}
      onPress={restaurantChoiceHandler}
    >
      <View style={styles.restaurant}>
        <BriefRestaurantInfo restaurant={restaurant} isList={true} fnc={goToDetailRestaurantInfoHandler} />
      </View>
    </Button>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 95,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainWhite1,
    opacity: 1,
  },
  restaurant: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
  },
});
