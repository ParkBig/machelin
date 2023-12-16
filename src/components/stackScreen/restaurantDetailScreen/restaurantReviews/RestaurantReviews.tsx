import { useNavigation, useRoute } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { Colors, Shadow, Size } from 'const/global-styles';
import useRestaurantDetailQuery from 'query/hooks/restaurants/useRestaurantDetailQuery';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UseNavigation, UseRouter } from 'types/screen/screenType';
import MachelinReviews from './reviews/MachelinReviews';
import GoogleReviews from './reviews/GoogleReviews';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { PermissionStatus, requestForegroundPermissionsAsync } from 'expo-location';

export default function RestaurantReviews() {
  const { navigate } = useNavigation<UseNavigation<'RestaurantDetailScreen'>>();
  const { params } = useRoute<UseRouter<'RestaurantDetailScreen'>>();
  const { restaurantDetail } = useRestaurantDetailQuery(params.restaurantId);
  const { myInfo } = useMyInfoQuery();
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const goToMakePostHandler = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== PermissionStatus.GRANTED) {
      setToggleAlertModal({ toggle: true, alertMsg: '위치 접근 권한이 필요합니다' });
      return;
    }

    if (!myInfo?.authUser) {
      setToggleAlertModal({ toggle: true, alertMsg: '로그인 후 이용가능합니다' });
      return;
    }

    if (!restaurantDetail?.restaurantDetail) {
      setToggleAlertModal({ toggle: true, alertMsg: '잠시후 다시 시도해주세요' });
      return;
    }

    navigate('MakePostScreen', {
      restaurantInfo: restaurantDetail?.restaurantDetail,
    });
  };

  return (
    <>
      <View style={styles.reviews}>
        <View style={styles.reviewTitle}>
          <Text style={styles.titleText}>리뷰</Text>
          <Button style={styles.button} onPress={goToMakePostHandler}>
            <Text style={styles.buttonText}>리뷰작성</Text>
          </Button>
        </View>
        <MachelinReviews />
        <GoogleReviews reviews={restaurantDetail?.restaurantDetail?.reviews} />
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
    marginBottom: 30,
  },
  reviewTitle: {
    padding: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 5,
    borderBottomColor: Colors.mainGreen2,
  },
  button: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainGreen2,
    borderRadius: 10,
    ...Shadow,
  },
  buttonText: {
    fontSize: Size.normalMiddle,
    color: Colors.mainWhite3,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: Size.normalMiddle,
    fontWeight: 'bold',
  },
});
