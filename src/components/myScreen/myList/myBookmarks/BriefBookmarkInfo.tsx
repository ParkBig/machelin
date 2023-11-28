import Button from 'components/common/Button';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Bookmark } from 'types/store/myInfoType';

interface Props {
  bookmark: Bookmark;
  onPress: () => void;
}

export default function BriefBookmarkInfo({ bookmark, onPress }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.imgWrap}>
        <View style={styles.img}></View>
      </View>
      <View style={styles.info}>
        <View style={styles.restaurantName}>
          <View>
            <Text>{bookmark.restaurantName}</Text>
          </View>
          <View style={styles.rating}>
            <Ionicons name="star" color="yellow" size={20} />
            <Text>
              {bookmark.rating}/5 {`(${bookmark.totalRatings})`}
            </Text>
          </View>
        </View>
        <View style={styles.restaurantAddress}>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {bookmark.address}
          </Text>
        </View>
      </View>
      <Button style={styles.Interaction} onPress={onPress}>
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
    borderRadius: 5,
  },
  imgWrap: {
    height: 80,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 55,
    height: 55,
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
