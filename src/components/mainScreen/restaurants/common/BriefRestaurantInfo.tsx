import { Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IRestaurantInfo } from 'types/data/restaureant';
import Button from 'components/common/Button';
import imageTranslator from 'util/imageTranslator';

interface Props {
  restaurant: IRestaurantInfo;
  isList: boolean;
  fnc: () => void;
}

export default function BriefRestaurantInfo({ restaurant, isList, fnc }: Props) {
  const imageUrl = imageTranslator(restaurant.photos, true);

  return (
    <>
      <View style={styles.imgWrap}>
        <Image source={imageUrl[0] ? { uri: imageUrl[0] } : require('assets/png/dish.png')} style={styles.img} resizeMode='cover' />
      </View>
      <View style={styles.info}>
        <View style={styles.restaurantName}>
          <View style={styles.title}>
            <Text numberOfLines={1} ellipsizeMode='tail'>{restaurant.name}</Text>
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
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  img: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
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
  title: {
    flex: 1,
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
