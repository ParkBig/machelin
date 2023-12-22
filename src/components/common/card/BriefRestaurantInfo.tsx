import Button from 'components/common/layout/Button';
import { Image, StyleSheet, Text, View } from 'react-native';
import imageTranslator from 'util/imageTranslator';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Size } from 'const/global-styles';
import { GooglePlace } from 'types/types';

interface Props {
  restaurant: GooglePlace;
  isList: boolean;
  fnc: () => void;
}

export default function BriefRestaurantInfo({ restaurant, isList, fnc }: Props) {
  const imageUrl = imageTranslator(restaurant.photos, true);

  return (
    <View style={styles.wrap}>
      <View style={styles.imgWrap}>
        <Image
          source={imageUrl[0] ? { uri: imageUrl[0] } : require('assets/png/dish.png')}
          style={styles.img}
          resizeMode="cover"
        />
      </View>
      <View style={styles.info}>
        <View style={styles.restaurantName}>
          <View style={{ flex: 1 }}>
            <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
              {restaurant.name}
            </Text>
          </View>
          <View style={styles.rating}>
            <Ionicons name="star" color={Colors.kakaoBackground} size={20} />
            <Text>{restaurant.rating ? restaurant.rating : 0} / 5</Text>
            <Text>({restaurant.user_ratings_total ? restaurant.user_ratings_total : 0})</Text>
          </View>
        </View>
        <View style={styles.restaurantAddress}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.addressText}>
            {restaurant.formatted_address ? restaurant.formatted_address : restaurant.vicinity}
          </Text>
        </View>
      </View>
      <Button style={styles.button} onPress={fnc}>
        <Ionicons name={isList ? 'chevron-forward' : 'chevron-up'} size={25} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgWrap: {
    height: '100%',
    width: 75,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  img: {
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  info: {
    flex: 1,
    height: 60,
  },
  restaurantName: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    height: '100%',
    paddingLeft: 5,
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
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    height: '100%',
    width: 50,
  },
  nameText: {
    fontSize: Size.normalMiddle,
    fontWeight: 'bold',
  },
  addressText: {
    color: Colors.darkGray,
  },
});
