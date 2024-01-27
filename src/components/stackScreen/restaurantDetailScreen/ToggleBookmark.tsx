import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import { Colors } from 'const/global-styles';
import { toggleBookmarkQuery } from 'query/api/bookmarks';
import useRestaurantDetailQuery from 'query/hooks/restaurants/useRestaurantDetailQuery';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import useUsersBookmarksQuery from 'query/hooks/users/useUsersBookmarksQuery';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useMutation } from 'react-query';
import imageTranslator from 'util/imageTranslator';

interface Props {
  restaurantId: string;
}

export default function ToggleBookmark({ restaurantId }: Props) {
  const { restaurantDetail, restaurantDetailIsLoading } = useRestaurantDetailQuery(restaurantId);
  const { myInfo, reMyInfo } = useMyInfoQuery();
  const { bookmarks, reBookmarks } = useUsersBookmarksQuery();
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const { mutate, isLoading } = useMutation(toggleBookmarkQuery, {
    onSettled: res => {
      if (res.ok) {
        reMyInfo();
        reBookmarks();
      } else {
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
    onError: () => {
      setToggleAlertModal({ toggle: true, alertMsg: '서버가 잠시 아픈거 같아요...' });
    },
  });

  const toggleBookmarkHandler = () => {
    if (!myInfo?.authUser) {
      setToggleAlertModal({ toggle: true, alertMsg: '로그인 후 이용가능합니다' });
      return;
    }

    if (!restaurantDetail || restaurantDetailIsLoading) {
      setToggleAlertModal({ toggle: true, alertMsg: '잠시후 다시 시도해주세요' });
      return;
    }

    const {
      place_id,
      geometry: {
        location: { lat, lng },
      },
      name,
      formatted_address,
      rating,
      user_ratings_total,
      photos,
    } = restaurantDetail?.restaurantDetail;

    const images = imageTranslator(photos, true);

    mutate({
      restaurantId: place_id,
      lat,
      lng,
      restaurantName: name,
      images,
      address: formatted_address,
      rating: rating ? rating : 0,
      totalRatings: user_ratings_total ? user_ratings_total : 0,
    });
  };

  const isMyBookmark = bookmarks?.bookmarks?.find(bookmark => {
    return bookmark.restaurantId === restaurantId;
  });

  return (
    <>
      {isLoading ? (
        <LoadingOverlay style={styles.loadingOverlay} size={30} color={Colors.mainWhite3} />
      ) : (
        <Button onPress={toggleBookmarkHandler}>
          <Ionicons name={isMyBookmark ? 'bookmark' : 'bookmark-outline'} size={25} color={Colors.mainWhite3} />
        </Button>
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
  loadingOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
