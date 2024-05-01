import { Linking, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'const/global-styles';
import Button from 'components/common/layout/Button';
import useRestaurantDetailQuery from 'query/hooks/restaurants/useRestaurantDetailQuery';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UseNavigation, UseRouter } from 'types/screenType';
import { useState } from 'react';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';

export default function RestaurantInfoFunction() {
  const { params } = useRoute<UseRouter<'RestaurantDetailScreen'>>();
  const { navigate } = useNavigation<UseNavigation<'RestaurantDetailScreen'>>();
  const { restaurantDetail } = useRestaurantDetailQuery(params.restaurantId);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const searchGoogleHandler = async () => {
    const supported = await Linking.canOpenURL(
      `https://www.google.com/search?q=${restaurantDetail?.restaurantDetail?.name}`
    );

    if (supported) {
      await Linking.openURL(`https://www.google.com/search?q=${restaurantDetail?.restaurantDetail?.name}`);
    }
  };

  const goToRestaurantDetailMapScreenHandler = () => {
    if (
      !restaurantDetail ||
      !restaurantDetail.restaurantDetail.name ||
      !restaurantDetail.restaurantDetail.geometry.location.lat ||
      !restaurantDetail.restaurantDetail.geometry.location.lng
    ) {

      setToggleAlertModal({ toggle: true, alertMsg: '현재 이용할 수 없는 장소입니다.' });
      return;
    }

    navigate('RestaurantDetailMapScreen', {
      restaurantName: restaurantDetail.restaurantDetail.name,
      restaurantLat: restaurantDetail.restaurantDetail.geometry.location.lat,
      restaurantLng: restaurantDetail.restaurantDetail.geometry.location.lng,
    });
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.info}>
        <Ionicons name="logo-google" size={30} color={Colors.mainGreen2} />
        <Button style={styles.infoContent} onPress={searchGoogleHandler}>
          <Text>구글 검색해보기</Text>
          <Ionicons name="chevron-forward" size={30} color={Colors.mainGreen2} />
        </Button>
      </View>
      <View style={styles.info}>
        <Ionicons name="map" size={30} color={Colors.mainGreen2} />
        <Button style={styles.infoContent} onPress={goToRestaurantDetailMapScreenHandler}>
          <Text>지도로 위치보기</Text>
          <Ionicons name="chevron-forward" size={30} color={Colors.mainGreen2} />
        </Button>
      </View>
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    padding: 15,
    gap: 10,
  },
  info: {
    width: '100%',
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
