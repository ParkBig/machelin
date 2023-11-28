import { StyleSheet, Text, View } from 'react-native';
import { DetailRestaurant } from 'types/data/restaureant';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  restaurantInfo: DetailRestaurant;
}

export default function HasRestaurantInfo({ restaurantInfo }: Props) {
  return (
    <>
      <View style={styles.img}>
        <Text>img</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.restaurantName}>
          <View>
            <Text>{restaurantInfo.name}</Text>
          </View>
          <View style={styles.rating}>
            <Ionicons name="star" color="yellow" size={20} />
            <Text>
              {restaurantInfo.rating}/5 {`(${restaurantInfo.user_ratings_total})`}
            </Text>
          </View>
        </View>
        <View style={styles.restaurantAddress}>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {restaurantInfo.vicinity}
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  img: {
    height: '100%',
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  info: {
    flex: 1,
    height: '100%',
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
});

