import { Colors } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { IPost } from 'types/store/myInfoType';
import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/Button';
import Line from 'components/common/Line';

interface Props {
  posts: IPost;
}

export default function PostBriefRestaurantInfo({ posts }: Props) {
  const goToDetailRestaurantHandler = () => {
    // with id goto detailResScreen
    // navigate('');
  };

  if (!posts.restaurantId) return null;

  return (
    <>
      <View style={styles.wrap}>
        <View style={styles.imgWrap}>
          <Ionicons name="restaurant-outline" size={25} color={Colors.mainBlue1} />
        </View>
        <View style={styles.infos}>
          <View>
            <Text>{posts.restaurantName}</Text>
          </View>
          <View>
            <Text numberOfLines={1} ellipsizeMode="tail">
              {posts.restaurantAddress}
            </Text>
          </View>
        </View>
        <Button style={styles.button} onPress={goToDetailRestaurantHandler}>
          <Ionicons name="chevron-forward" size={25} color={Colors.darkGray} />
        </Button>
      </View>
      {posts.images.length === 0 ? <Line style={styles.lineOnlyRestaurant} /> : <Line style={styles.lineBoth} />}
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 10,
    width: '100%',
    flexDirection: 'row',
  },
  imgWrap: {
    width: 40,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainGreen1,
  },
  img: {
    height: 30,
    width: 30,
    borderRadius: 10,
  },
  infos: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    right: 0,
    width: 40,
  },
  lineOnlyRestaurant: {
    width: '100%',
    height: 3,
    marginVertical: 10,
    backgroundColor: Colors.mainGreen1,
  },
  lineBoth: {
    width: '100%',
    height: 3,
    marginTop: 10,
    backgroundColor: Colors.mainGreen1,
  },
});
