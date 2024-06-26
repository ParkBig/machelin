import Modal from 'react-native-modal';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Shadow, Size } from 'const/global-styles';
import { useEffect, useState } from 'react';
import Button from 'components/common/layout/Button';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screenType';

export default function PleaseVerifyModal() {
  const { myInfo } = useMyInfoQuery();
  const [toggleModal, setToggleModal] = useState(false);
  const { navigate } = useNavigation<UseNavigation<'MyInfoScreen'>>();

  const closeModalHandler = () => {
    setToggleModal(false);
  };

  const gotoVerifyHandler = () => {
    setToggleModal(false);
    navigate('TermsOfUseScreen');
  };

  useEffect(() => {
    if (!myInfo?.authUser.isVerified) {
      setToggleModal(true);
    }
  }, [myInfo?.authUser.isVerified]);

  return (
    <Modal
      hasBackdrop={false}
      style={styles.modal}
      isVisible={toggleModal}
      onSwipeComplete={closeModalHandler}
      onBackButtonPress={closeModalHandler}
      swipeDirection={['down']}
      useNativeDriverForBackdrop
    >
      <View style={styles.wrap}>
        <View style={styles.msg}>
          <Text style={styles.text}>전화번호 인증을 통해 계정을 보호하세요</Text>
        </View>
        <View style={styles.buttons}>
          <Button style={styles.button} onPress={closeModalHandler}>
            <Text style={styles.text}>취소</Text>
          </Button>
          <Button style={styles.button} onPress={gotoVerifyHandler}>
            <Text style={styles.text}>확인</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    marginBottom: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  wrap: {
    padding: 10,
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainWhite1,
    borderRadius: 5,
    gap: 20,
    ...Shadow,
  },
  msg: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: Size.normalMiddle,
  },
});
