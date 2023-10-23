import { restaurant } from 'data/mockRestaurant';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet } from 'react-native';
import { StackScreenPropsAbout } from 'types/screen/screenType';
import RestaurantInfos from 'components/restaurantDetailScreen/RestaurantInfos';
import RestaurantGrade from 'components/restaurantDetailScreen/RestaurantGrade';
import RestaurantImg from 'components/restaurantDetailScreen/RestaurantImg';
import RestaurantReviews from 'components/restaurantDetailScreen/RestaurantReviews';
import { Colors } from 'const/global-styles';
import { useLayoutEffect } from 'react';
import Button from 'components/common/Button';
import { useMutation } from 'react-query';
import { bookmarkQuery } from 'query/user';
import useMyInfoQuery from 'query/hooks/useMyInfoQuery';
import { Bookmark } from 'types/store/myInfoType';

export default function RestaurantDetailScreen({ navigation, route }: StackScreenPropsAbout<'RestaurantDetailScreen'>) {
  const { myInfo, reMyInfo } = useMyInfoQuery();
  const { mutate } = useMutation(bookmarkQuery, {
    onSettled: () => reMyInfo(),
  });
  const {
    name,
    place_id,
    geometry: {
      location: { lat, lng },
    },
    vicinity,
    rating,
    user_ratings_total,
  } = route.params.restaurant;

  const mockRestaurant = restaurant;

  const toggleBookmarkHandler = () => {
    mutate({
      id: place_id,
      lat,
      lng,
      restaurantName: name,
      img: '',
      address: vicinity,
      rating,
      totalUserRatings: user_ratings_total,
    });
  };

  useLayoutEffect(() => {
    const isMyBookmark = myInfo?.authUser?.bookmarks.find(bookmark => {
      const parseBookmark: Bookmark = JSON.parse(bookmark);
      return parseBookmark.id === place_id;
    });
    navigation.setOptions({
      title: name,
      headerRight: () => (
        <Button onPress={toggleBookmarkHandler}>
          <Ionicons name={isMyBookmark ? 'bookmark' : 'bookmark-outline'} size={25} />
        </Button>
      ),
    });
  }, [navigation, myInfo]);

  return (
    <ScrollView style={styles.wrap}>
      <RestaurantImg photos={mockRestaurant.photos} />
      <RestaurantGrade rating={mockRestaurant.rating} />
      <RestaurantInfos
        phone={mockRestaurant.formatted_phone_number}
        vicinity={mockRestaurant.vicinity}
        opening_hours={mockRestaurant.opening_hours}
      />
      <RestaurantReviews restaurantInfo={mockRestaurant} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.mainWhite1,
  },
});
