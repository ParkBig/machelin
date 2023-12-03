import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/ConfirmAlertModal';
import { Colors } from 'const/global-styles';
import { toggleBookmarkQuery } from 'query/bookmarks';
import useRestaurantDetailQuery from 'query/hooks/restaurants/useRestaurantDetailQuery';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import useUsersBookmarksQuery from 'query/hooks/users/useUsersBookmarksQuery';
import { useState } from 'react';
import { useMutation } from 'react-query';
import imageTranslator from 'util/imageTranslator';

interface Props {
  restaurantId: string;
}

export default function ToggleBookmark({ restaurantId }: Props) {
  const { restaurantDetail, restaurantDetailIsLoading } = useRestaurantDetailQuery(restaurantId);
  const { myInfo, reMyInfo } = useMyInfoQuery();
  const { bookmarks, reBookmarks } = useUsersBookmarksQuery(myInfo?.authUser?.id);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const { mutate } = useMutation(toggleBookmarkQuery, {
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
      vicinity,
      rating,
      user_ratings_total,
      photos,
    } = restaurantDetail?.restaurantDetail;

    const images = imageTranslator(photos,true);

    mutate({
      restaurantId: place_id,
      lat: String(lat),
      lng: String(lng),
      restaurantName: name,
      images,
      address: vicinity,
      rating: String(rating),
      totalRatings: String(user_ratings_total),
    });
  };

  const isMyBookmark = bookmarks?.bookmarks?.find(bookmark => {
    return bookmark.restaurantId === restaurantId;
  });

  return (
    <>
      <Button onPress={toggleBookmarkHandler}>
        <Ionicons name={isMyBookmark ? 'bookmark' : 'bookmark-outline'} size={25} color={Colors.mainWhite3} />
      </Button>
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </>
  );
}
