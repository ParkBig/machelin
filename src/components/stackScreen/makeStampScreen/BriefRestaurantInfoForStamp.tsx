import Button from 'components/common/layout/Button';
import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { GooglePlace } from 'types/types';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'react-query';
import { makeStampQuery } from 'query/stamps';
import { useRecoilValue } from 'recoil';
import { myLocationState } from 'store/locationState';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screenType';
import { useState } from 'react';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import useUsersStampsQuery from 'query/hooks/users/useUsersStampsQuery';

interface Props {
  restaurantInfo: GooglePlace;
}

export default function BriefRestaurantInfoForStamp({ restaurantInfo }: Props) {
  const { goBack } = useNavigation<UseNavigation<'MakeStampScreen'>>();
  const { reStamps } = useUsersStampsQuery();
  const myLocation = useRecoilValue(myLocationState);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const { mutate } = useMutation(makeStampQuery, {
    onSuccess: res => {
      if (res.ok) {
        goBack();
        reStamps();
      } else {
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
  });

  const onPressHandler = () => {
    if (!myLocation.isGetLocation) {
      setToggleAlertModal({ toggle: true, alertMsg: '내위치 정보가 없습니다' });
      return;
    }

    mutate({
      restaurantId: restaurantInfo.place_id,
      restaurantName: restaurantInfo.name,
      address: restaurantInfo.formatted_address ? restaurantInfo.formatted_address : restaurantInfo.vicinity,
      rating: restaurantInfo.rating ? restaurantInfo.rating : 0,
      totalRatings: restaurantInfo.user_ratings_total ? restaurantInfo.user_ratings_total : 0,
      lat: myLocation.latitude,
      lng: myLocation.longitude,
    });
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.info}>
        <View style={styles.name}>
          <Text style={styles.nameText}>{restaurantInfo.name}</Text>
        </View>
        <View style={styles.address}>
          <Text style={styles.addressText}>{restaurantInfo.formatted_address}</Text>
        </View>
      </View>
      <Button style={styles.button} onPress={onPressHandler}>
        <Ionicons name="paw" size={30} color={Colors.mainGreen2} />
      </Button>
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
    minHeight: 80,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  info: {
    flex: 8,
    justifyContent: 'center',
    gap: 10,
  },
  name: {
    flex: 1,
    justifyContent: 'center',
  },
  address: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: Colors.superLightGray,
  },
  nameText: {
    fontSize: Size.normalMiddle,
    fontWeight: 'bold',
  },
  addressText: {
    color: Colors.gray,
  },
  tagText: {
    color: Colors.mainGreen2,
    fontWeight: 'bold',
  },
});
