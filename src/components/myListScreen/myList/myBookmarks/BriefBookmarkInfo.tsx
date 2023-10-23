import Button from 'components/common/Button';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Bookmark } from 'types/store/myInfoType';
import { Colors, Shadow } from 'const/global-styles';

interface Props {
  bookmark: Bookmark;
  onPress: () => void;
}

export default function BriefBookmarkInfo({ bookmark, onPress }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.img}>
        <Text>img</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.restaurantName}>
          <View>
            <Text>{bookmark.restaurantName}</Text>
          </View>
          <View style={styles.rating}>
            <Ionicons name="star" color="yellow" size={20} />
            <Text>
              {bookmark.rating}/5 {`(${bookmark.totalUserRatings})`}
            </Text>
          </View>
        </View>
        <View style={styles.restaurantAddress}>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {bookmark.address}
          </Text>
        </View>
        <Button style={styles.Interaction} onPress={onPress}>
          <Ionicons name="chevron-forward" size={25} />
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flexDirection: 'row',
  },
  img: {
    height: 75,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
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
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Colors.mainWhite1,
    ...Shadow,
  },
});
