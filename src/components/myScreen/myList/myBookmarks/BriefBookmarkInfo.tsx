import Button from 'components/common/Button';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Bookmark } from 'types/store/myInfoType';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screen/screenType';

interface Props {
  bookmark: Bookmark;
}

export default function BriefBookmarkInfo({ bookmark }: Props) {
  const { navigate } = useNavigation<UseNavigation<'MyScreen'>>();

  const imageUrl = bookmark.images[0];

  const goToDetailRestaurantHandler = () => {
    navigate('RestaurantDetailScreen', {
      restaurantName: bookmark.restaurantName,
      restaurantId: bookmark.restaurantId,
    });
  };

  return (
    <View style={styles.wrap}>
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
      <Button style={styles.Interaction} onPress={goToDetailRestaurantHandler}>
        <Ionicons name="chevron-forward" size={25} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
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
    flexWrap: 'wrap',
  },
  Interaction: {
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    height: 80,
    width: 40,
  },
});
