import { useNavigation, useRoute } from '@react-navigation/native';
import Button from 'components/common/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/ConfirmAlertModal';
import useRestaurantDetailQuery from 'query/hooks/restaurants/useRestaurantDetailQuery';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UseNavigation, UseRouter } from 'types/screen/screenType';

export default function RestaurantReviews() {
  const { navigate } = useNavigation<UseNavigation<'RestaurantDetailScreen'>>();
  const { params } = useRoute<UseRouter<'RestaurantDetailScreen'>>();
  const { restaurantDetail } = useRestaurantDetailQuery(params.restaurantId);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const goToMakePostHandler = () => {
    if (!restaurantDetail?.detailRestaurant) {
      setToggleAlertModal({ toggle: true, alertMsg: '잠시후 다시 시도해주세요' });
      return;
    }

    navigate('MakePostScreen', {
      restaurantInfo: restaurantDetail?.detailRestaurant,
    });
  };

  return (
    <>
      <View style={styles.reviews}>
        <View style={styles.reviewTitle}>
          <Text>리뷰</Text>
          <Button onPress={goToMakePostHandler}>
            <Text>리뷰작성</Text>
          </Button>
        </View>
        <Text>reviews</Text>
      </View>
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </>
  );
}

const styles = StyleSheet.create({
  reviews: {
    width: '100%',
    paddingHorizontal: 15,
  },
  reviewTitle: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
