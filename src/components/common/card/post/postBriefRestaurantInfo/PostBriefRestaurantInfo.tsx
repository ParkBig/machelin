import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { IPost, PostNavigation } from 'types/types';
import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/layout/Button';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { UseNavigation } from 'types/screenType';
import Line from 'components/common/layout/Line';

interface Props {
  posts: IPost;
}

export default function PostBriefRestaurantInfo({ posts }: Props) {
  if (!posts.restaurantId) return null;

  const { navigate } = useNavigation<UseNavigation<PostNavigation>>();
  const navigationState = useNavigationState(state => state);

  const goToDetailRestaurantHandler = () => {
    navigate('RestaurantDetailScreen', {
      restaurantName: posts.restaurantName,
      restaurantId: posts.restaurantId,
    });
  };

  const whichScreen =
    navigationState.routes[navigationState.index].name === 'RestaurantDetailScreen'
      ? 'RestaurantDetailScreen'
      : navigationState.routes[navigationState.index].name === 'NeighborhoodPostsScreen'
        ? 'NeighborhoodPostsScreen'
        : 'else';

  return (
    <>
      {whichScreen !== 'RestaurantDetailScreen' && (
        <>
          <View style={styles.wrap}>
            <View style={styles.ratingNIcon}>
              <Ionicons style={styles.ionicons} size={25} name="star" color="yellow" />
              <View style={styles.rating}>
                <Text style={styles.ratingText}>{posts.rating} / 5</Text>
              </View>
            </View>
            <View style={styles.info}>
              <View style={styles.name}>
                <Text style={styles.nameText}>{posts.restaurantName}</Text>
              </View>
              <View style={styles.restaurantAddress}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.addressText}>
                  {posts.restaurantAddress}
                </Text>
              </View>
            </View>
            <Button style={styles.button} onPress={goToDetailRestaurantHandler}>
              <Ionicons name="chevron-forward" size={25} color={Colors.darkGray} />
            </Button>
          </View>
          <Line style={styles.line} />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 10,
    width: '100%',
    flexDirection: 'row',
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
    marginVertical: 10,
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
