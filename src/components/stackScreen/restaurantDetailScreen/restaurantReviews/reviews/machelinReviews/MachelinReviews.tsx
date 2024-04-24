import { useNavigation, useRoute } from '@react-navigation/native';
import Post from 'components/common/card/post/Post';
import Button from 'components/common/layout/Button';
import Line from 'components/common/layout/Line';
import { Colors, Size } from 'const/global-styles';
import useRestaurantPostsQuery from 'query/hooks/restaurants/useRestaurantPostsQuery';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { UseNavigation, UseRouter } from 'types/screenType';
import NoMachelinReviews from './NoMachelinReviews';
import { useState } from 'react';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { PermissionStatus, requestForegroundPermissionsAsync } from 'expo-location';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import useRestaurantDetailQuery from 'query/hooks/restaurants/useRestaurantDetailQuery';
import { Ionicons } from '@expo/vector-icons';

export default function MachelinReviews() {
  const { params } = useRoute<UseRouter<'RestaurantDetailScreen'>>();
  const { navigate } = useNavigation<UseNavigation<'RestaurantDetailScreen'>>();
  const { myInfo } = useMyInfoQuery();
  const { restaurantDetail } = useRestaurantDetailQuery(params.restaurantId);
  const { restaurantPosts, fetchNextPagePosts, hasNextPage } = useRestaurantPostsQuery(params.restaurantId);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const goToMakePostHandler = async () => {
    if (!myInfo?.authUser) {
      setToggleAlertModal({ toggle: true, alertMsg: '로그인 후 이용가능합니다' });
      return;
    }

    if (!restaurantDetail?.restaurantDetail) {
      setToggleAlertModal({ toggle: true, alertMsg: '잠시후 다시 시도해주세요' });
      return;
    }

    const { status } = await requestForegroundPermissionsAsync();
    if (status !== PermissionStatus.GRANTED) {
      setToggleAlertModal({ toggle: true, alertMsg: '위치 접근 권한이 필요합니다' });
      return;
    }

    navigate('MakePostScreen', {
      restaurantInfo: restaurantDetail?.restaurantDetail,
      prevScreen: 'RestaurantDetailScreen',
    });
  };

  const onPressHandler = () => {
    fetchNextPagePosts();
  };

  return (
    <>
      <View style={styles.reviewTitle}>
        <View style={styles.title}>
          <Ionicons name="restaurant" size={30} color={Colors.mainWhite3} />
          <Text style={styles.titleText}>마슐랭리뷰</Text>
        </View>
        <Button style={styles.makePostButton} onPress={goToMakePostHandler}>
          <Text style={styles.makePostButtonText}>리뷰작성</Text>
        </Button>
      </View>
      {restaurantPosts?.pages && restaurantPosts.pages.length !== 0 ? (
        <FlatList
          scrollEnabled={false}
          style={styles.posts}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => String(item.id)}
          data={restaurantPosts?.pages}
          renderItem={({ item }) => <Post posts={item} />}
          ItemSeparatorComponent={() => <Line style={styles.line} />}
          ListFooterComponent={() =>
            hasNextPage ? (
              <Button style={styles.showMoreButton} onPress={onPressHandler}>
                <Text style={styles.text}>더보기</Text>
              </Button>
            ) : (
              <View style={styles.listFooterComponent}>
                <Text style={styles.listFooterText}>- 마슐랭 -</Text>
              </View>
            )
          }
        />
      ) : (
        <NoMachelinReviews goToMakePostHandler={goToMakePostHandler} />
      )}
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </>
  );
}

const styles = StyleSheet.create({
  reviewTitle: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: Colors.mainGreen2,
  },
  title: {
    flexDirection: 'row',
    gap: 5,
  },
  titleText: {
    fontSize: Size.bigSmall,
    fontWeight: 'bold',
    color: Colors.mainWhite3,
  },
  makePostButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainWhite3,
    borderRadius: 10,
  },
  makePostButtonText: {
    fontSize: Size.normalMiddle,
    color: Colors.mainGreen2,
    fontWeight: 'bold',
  },
  posts: {
    width: '100%',
  },
  line: {
    width: '100%',
    height: 10,
    backgroundColor: Colors.lightGrayOpacity1,
  },
  showMoreButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: Colors.lightGrayOpacity1,
  },
  text: {
    color: Colors.darkGray,
    fontWeight: 'bold',
  },
  listFooterComponent: {
    height: 90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listFooterText: {
    fontWeight: 'bold',
    color: Colors.gray,
  },
});
