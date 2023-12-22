import { StyleSheet, Text, View } from 'react-native';
import { GooglePlace } from 'types/types';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Size } from 'const/global-styles';

interface Props {
  restaurantInfo: GooglePlace;
}

export default function HasRestaurantInfo({ restaurantInfo }: Props) {
  return (
    <View style={styles.info}>
      <View style={styles.restaurantNameNRating}>
        <View style={styles.rating}>
          <Ionicons name="star" color={Colors.kakaoBackground} size={Size.bigBig} />
          <Text style={styles.ratingText}>{restaurantInfo.rating} / 5</Text>
          <Text style={styles.ratingText}> ({restaurantInfo.user_ratings_total})</Text>
        </View>
        <View style={styles.name}>
          <Text style={styles.nameText}>{restaurantInfo.name}</Text>
        </View>
      </View>
      <View style={styles.restaurantAddress}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.addressText}>
          {restaurantInfo.formatted_address}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ratingNIcon: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  ionicons: {
    width: 40,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
    backgroundColor: Colors.mainGreen2,
  },
  info: {
    flex: 1,
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    gap: 15,
  },
  restaurantNameNRating: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  name: {
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  restaurantAddress: {
    width: '100%',
    justifyContent: 'center',
  },
  ratingText: {
    fontSize: Size.normalSmall,
    color: Colors.gray,
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: Size.normalMiddle,
    fontWeight: 'bold',
  },
  addressText: {
    color: Colors.gray,
    fontWeight: 'bold',
  },
});
