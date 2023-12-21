import Button from 'components/common/layout/Button';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screenType';
import { useSetRecoilState } from 'recoil';
import { focusedRestaurantState } from 'store/locationState';
import { Bookmark } from 'types/types';

interface Props {
  bookmark: Bookmark;
  isSlide: boolean;
}

export default function BriefBookmarkInfo({ bookmark, isSlide }: Props) {
  const { navigate } = useNavigation<UseNavigation<'MyScreen' | 'ExploreUserInfoScreen' | 'MyMapScreen'>>();
  const setFocusedRestaurant = useSetRecoilState(focusedRestaurantState);
  const imageUrl = bookmark.images[0];

  const onPressHandler = () => {
    if (!isSlide) {
      return;
    }

    setFocusedRestaurant({
      isFocused: true,
      id: `${bookmark.id}`,
      latitude: +bookmark.lat,
      longitude: +bookmark.lng,
    });
  };

  const goToDetailRestaurantHandler = () => {
    navigate('RestaurantDetailScreen', {
      restaurantName: bookmark.restaurantName,
      restaurantId: bookmark.restaurantId,
    });
  };
  return (
    <Button style={styles.wrap} onPress={onPressHandler}>
      <View style={styles.imgWrap}>
        <Image
          style={styles.img}
          source={imageUrl ? { uri: imageUrl } : require('assets/png/dish.png')}
          resizeMode="cover"
        />
      </View>
      <View style={styles.info}>
        <View style={styles.restaurantName}>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {bookmark.restaurantName}
          </Text>
        </View>
        <View style={styles.restaurantAddress}>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {bookmark.address}
          </Text>
        </View>
      </View>
      <Button style={styles.button} onPress={goToDetailRestaurantHandler}>
        <Ionicons name="chevron-forward" size={25} />
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
    minHeight: 80,
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantName: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
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
    height: 80,
    width: 40,
  },
});
