import Button from 'components/common/layout/Button';
import Line from 'components/common/layout/Line';
import { Colors, Shadow } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';

interface Props {
  toggleModal: boolean;
  toggleModalHandler: () => void;
  reVerifyHandler: () => void;
}

export default function ReVerifyModal({ toggleModal, toggleModalHandler, reVerifyHandler }: Props) {
  return (
    <Modal
      style={styles.modal}
      backdropColor="transparent"
      isVisible={toggleModal}
      onSwipeComplete={toggleModalHandler}
      onBackdropPress={toggleModalHandler}
      onBackButtonPress={toggleModalHandler}
      swipeDirection={['down']}
      useNativeDriverForBackdrop
    >
      <View style={styles.wrap}>
        <View>
          <Text>인증번호 재발송 하시겠습니까?</Text>
        </View>
        <View style={styles.buttons}>
          <Button style={styles.button} onPress={toggleModalHandler}>
            <Text>아니요</Text>
          </Button>
          <Line style={styles.line} />
          <Button style={styles.button} onPress={reVerifyHandler}>
            <Text>네</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  wrap: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    borderColor: Colors.mainGreen1,
    borderWidth: 2,
    backgroundColor: Colors.mainWhite1,
    ...Shadow,
    gap: 15,
  },
  buttons: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: '50%',
    width: 3,
    backgroundColor: Colors.mainGreen1,
  },
});
