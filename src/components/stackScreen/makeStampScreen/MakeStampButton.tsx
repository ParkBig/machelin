import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { Colors, Size } from 'const/global-styles';
import useUsersStampsQuery from 'query/hooks/users/useUsersStampsQuery';
import { MakeStampInput, makeStampQuery } from 'query/stamps';
import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { myLocationState } from 'store/locationState';
import { makeStampState } from 'store/makeStampState';
import { UseNavigation } from 'types/screenType';

export default function MakeStampButton() {
  const { goBack } = useNavigation<UseNavigation<'MakeStampScreen'>>();
  const { reStamps } = useUsersStampsQuery();
  const myLocation = useRecoilValue(myLocationState);
  const makeStampValues = useRecoilValue(makeStampState);
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

  const makeStampHandler = () => {
    if (!myLocation.isGetLocation) {
      setToggleAlertModal({ toggle: true, alertMsg: '내위치 정보가 없습니다' });
      return;
    }

    if (!makeStampValues.title) {
      setToggleAlertModal({ toggle: true, alertMsg: '제목은 필수 내용입니다' });
      return;
    }

    const mutateParams: MakeStampInput = {
      title: makeStampValues.title,
      content: makeStampValues.content,
      lat: myLocation.latitude,
      lng: myLocation.longitude,
      restaurantId: makeStampValues.restaurantInfo ? makeStampValues.restaurantInfo.restaurantId : null,
      restaurantName: makeStampValues.restaurantInfo ? makeStampValues.restaurantInfo.restaurantName : null,
      address: makeStampValues.restaurantInfo ? makeStampValues.restaurantInfo.address : null,
    };

    mutate(mutateParams);
  };

  return (
    <Button style={styles.wrap} onPress={makeStampHandler}>
      <Text style={styles.text}>완료</Text>
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </Button>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 15,
  },
  text: {
    fontSize: Size.bigMiddle,
    fontWeight: 'bold',
    color: Colors.mainWhite3,
  },
});
