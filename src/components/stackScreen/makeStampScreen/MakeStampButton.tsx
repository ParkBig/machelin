import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { Colors, Size } from 'const/global-styles';
import mime from 'mime';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import useUsersStampsQuery from 'query/hooks/users/useUsersStampsQuery';
import { makeStampQuery } from 'query/stamps';
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
  const { myInfo } = useMyInfoQuery();
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

    const payloadFormData = new FormData();

    payloadFormData.append('title', makeStampValues.title);
    payloadFormData.append('content', makeStampValues.content);
    payloadFormData.append('lat', String(myLocation.latitude));
    payloadFormData.append('lng', String(myLocation.longitude));

    if (makeStampValues.images.length) {
      const now = Date.now();
      for (let i = 0; i < makeStampValues.images.length; i++) {
        /** 2번 인자에 sting아니면blob이라는데 blob형식으로 암만 보내도 네트워크 에러뜸 2틀동안 고생...  */
        //@ts-ignore
        payloadFormData.append('images', {
          uri: makeStampValues.images[i],
          type: mime.getType(makeStampValues.images[i]),
          name: `user${myInfo?.authUser.id}_stampImage${now}_${i + 1}`,
        });
      }
    }

    if (makeStampValues.restaurantInfo) {
      payloadFormData.append('restaurantId', makeStampValues.restaurantInfo.restaurantId);
      payloadFormData.append('restaurantName', makeStampValues.restaurantInfo.restaurantName);
      payloadFormData.append('address', makeStampValues.restaurantInfo.address);
    }

    mutate(payloadFormData);
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
