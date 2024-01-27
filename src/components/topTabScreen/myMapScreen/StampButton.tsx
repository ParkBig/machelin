import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { Colors, Shadow } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useResetRecoilState } from 'recoil';
import { makeStampState } from 'store/makeStampState';
import { UseNavigation } from 'types/screenType';

export default function StampButton() {
  const resetMakeStampState = useResetRecoilState(makeStampState);
  const { navigate } = useNavigation<UseNavigation<'MyMapScreen'>>();
  const { myInfo } = useMyInfoQuery();
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const onPressHandler = () => {
    if (!myInfo?.authUser) {
      setToggleAlertModal({ toggle: true, alertMsg: '로그인 후 이용가능합니다' });
      return;
    }

    resetMakeStampState();
    navigate('MakeStampScreen');
  };

  return (
    <Button style={styles.wrap} onPress={onPressHandler}>
      <Ionicons name="paw" size={30} color={Colors.mainWhite3} />
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
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mainGreen2,
    borderRadius: 25,
    ...Shadow,
  },
});
