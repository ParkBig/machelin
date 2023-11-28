import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IRestaurantInfo } from 'types/data/restaureant';
import Button from 'components/common/Button';

interface Props {
  restaurant: IRestaurantInfo;
  isList: boolean;
  fnc: () => void;
}

export default function BriefRestaurantInfo({ restaurant, isList, fnc }: Props) {
  return (
    <>
      <View style={styles.imgWrap}>
        <View style={styles.img}></View>
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
      </View>
      <Button style={styles.Interaction} onPress={fnc}>
        <Ionicons name={isList ? 'chevron-forward' : 'chevron-up'} size={25} />
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  imgWrap: {
    height: 80,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    height: 80,
    width: 40,
  },
});
