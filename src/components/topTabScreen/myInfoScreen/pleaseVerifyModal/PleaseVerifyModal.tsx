import Modal from 'react-native-modal';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Shadow, Size } from 'const/global-styles';
import { useEffect, useState } from 'react';
import Button from 'components/common/layout/Button';

export default function PleaseVerifyModal() {
  const { myInfo } = useMyInfoQuery();
  const [toggleModal, setToggleModal] = useState(false);

  const closeModalHandler = () => {
    setToggleModal(false);
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
      onBackdropPress={closeModalHandler}
      swipeDirection={['down']}
      useNativeDriverForBackdrop
    >
      <View style={styles.wrap}>
        <View style={styles.msg}>
          <Text style={styles.text}>전화번호 인증을 통해 계정을 보호하세요</Text>
        </View>
        <Button style={styles.button} onPress={closeModalHandler}>
          <Text style={styles.text}>확인</Text>
        </Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    marginBottom: 50,
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
  button: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: Size.normalMiddle,
  },
});
