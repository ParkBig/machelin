import { StyleSheet, Text, View } from 'react-native';
import { GooglePlace } from 'types/types';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Size } from 'const/global-styles';
import Button from 'components/common/layout/Button';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screenType';

interface Props {
  restaurantInfo: GooglePlace;
}

export default function HasRestaurantInfo({ restaurantInfo }: Props) {
  const { setParams } = useNavigation<UseNavigation<'MakePostScreen'>>();

  const deleteRestaurantInfoHandler = () => {
    setParams({
      restaurantInfo: null,
    });
  };

  return (
    <View style={styles.wrap}>
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
      <Button style={styles.deleteButton} onPress={deleteRestaurantInfoHandler}>
        <Ionicons name="close" size={Size.bigMiddle} color={Colors.darkGray} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    minHeight: 100,
    paddingVertical: 10,
    flexDirection: 'row',
    borderBottomColor: Colors.mainGreen1,
    borderBottomWidth: 1.5,
    gap: 15,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
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
  deleteButton: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
