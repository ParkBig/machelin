import Button from 'components/common/layout/Button';
import { IPost } from 'types/store/myInfoType';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Size } from 'const/global-styles';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screen/screenType';
import { useSetRecoilState } from 'recoil';
import { focusedRestaurantState } from 'store/locationState';

interface Props {
  post: IPost;
}

export default function PostHasRestaurant({ post }: Props) {
  const { navigate } = useNavigation<UseNavigation<'MyMapScreen'>>();
  const setFocusedRestaurant = useSetRecoilState(focusedRestaurantState);

  const onPressHandler = () => {
    setFocusedRestaurant({
      isFocused: true,
      id: `${post.id}`,
      latitude: +post.restaurantLat,
      longitude: +post.restaurantLng,
    });
  };

  const goToDetailRestaurantHandler = () => {
    navigate('RestaurantDetailScreen', {
      restaurantName: post.restaurantName,
      restaurantId: post.restaurantId,
    });
  };

  return (
    <Button style={styles.wrap} onPress={onPressHandler}>
      <View style={styles.ratingNIcon}>
        <Ionicons style={styles.ionicons} size={25} name="star" color="yellow" />
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{post.rating} / 5</Text>
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.name}>
          <Text style={styles.nameText}>{post.restaurantName}</Text>
        </View>
        <View style={styles.restaurantAddress}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.addressText}>
            {post.restaurantAddress}
          </Text>
        </View>
      </View>
      <Button style={styles.button} onPress={goToDetailRestaurantHandler}>
        <Ionicons name="chevron-forward" size={25} color={Colors.darkGray} />
      </Button>
    </Button>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingNIcon: {
    width: 40,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  ionicons: {
    width: 35,
    height: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
    backgroundColor: Colors.mainGreen2,
  },
  rating: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 30,
    width: 30,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    height: 60,
    paddingLeft: 10,
    justifyContent: 'center',
    gap: 5,
  },
  name: {
    width: '100%',
  },
  restaurantAddress: {
    width: '100%',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    right: 0,
    width: 40,
  },
  line: {
    width: '100%',
    height: 2,
    marginTop: 10,
    backgroundColor: Colors.mainGreen1,
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
