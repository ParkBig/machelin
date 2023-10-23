import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { responseRestaurant } from 'types/data/restaureant';
import { Colors, Shadow } from 'const/global-styles';
import Button from 'components/common/Button';

interface Props {
  restaurant: responseRestaurant;
  isList: boolean;
  fnc: () => void;
}

export default function BriefRestaurantInfo({ restaurant, isList, fnc }: Props) {
  return (
    <>
      <View style={styles.img}>
        <Text>img</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.restaurantName}>
          <View>
            <Text>{restaurant.name}</Text>
          </View>
          <View style={styles.rating}>
            <Ionicons name="star" color="yellow" size={20} />
            <Text>
              {restaurant.rating}/5 {`(${restaurant.user_ratings_total})`}
            </Text>
          </View>
        </View>
        <View style={styles.restaurantAddress}>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {restaurant.vicinity}
          </Text>
        </View>
        <Button style={styles.Interaction} onPress={fnc}>
          <Ionicons name={isList ? 'chevron-forward' : 'chevron-up'} size={25} />
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 75,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'red',
  },
  info: {
    flex: 1,
    height: 80,
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  restaurantName: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  restaurantAddress: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  Interaction: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Colors.mainWhite1,
    ...Shadow,
  },
});
