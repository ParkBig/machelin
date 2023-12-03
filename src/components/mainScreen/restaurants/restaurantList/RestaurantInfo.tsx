import { StyleSheet, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { focusedRestaurantState } from 'store/locationState';
import { IRestaurantInfo } from 'types/data/restaureant';
import { Colors } from 'const/global-styles';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screen/screenType';
import Button from 'components/common/Button';
import BriefRestaurantInfo from '../common/BriefRestaurantInfo';
import { memo } from 'react';

interface Props {
  restaurant: IRestaurantInfo;
}

const RestaurantInfo = memo(({ restaurant }: Props) => {
  const { navigate } = useNavigation<UseNavigation<'MainScreen'>>();
  const [focusedRestaurant, setFocusedRestaurant] = useRecoilState(focusedRestaurantState);

  const restaurantChoiceHandler = () => {
    const { lat, lng } = restaurant.geometry.location;
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
        backgroundColor: focusedRestaurant.id === restaurant.place_id ? Colors.superLightGray : Colors.mainWhite1,
      }}
      onPress={restaurantChoiceHandler}
    >
      <View style={styles.restaurant}>
        <BriefRestaurantInfo restaurant={restaurant} isList={true} fnc={goToDetailRestaurantInfoHandler} />
      </View>
    </Button>
  );
});

export default RestaurantInfo;

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
  },
});
