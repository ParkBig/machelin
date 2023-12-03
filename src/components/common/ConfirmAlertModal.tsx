import { Colors, Shadow, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import Button from './Button';

interface Props {
  toggleModal: boolean;
  setToggleAlertModal: React.Dispatch<React.SetStateAction<ToggleState>>;
  alertMsg: string;
}

export interface ToggleState {
  toggle: boolean;
  alertMsg: string;
}

export default function ConfirmAlertModal({ toggleModal, setToggleAlertModal, alertMsg }: Props) {
  const closeModalHandler = () => {
    setToggleAlertModal({ toggle: false, alertMsg: '' });
  };

  return (
    <Modal
      style={styles.modal}
      backdropColor="transparent"
      isVisible={toggleModal}
      onSwipeComplete={closeModalHandler}
      onBackButtonPress={closeModalHandler}
      swipeDirection={['down']}
      useNativeDriverForBackdrop
    >
      <View style={styles.wrap}>
        <Text style={styles.text}>{alertMsg}</Text>
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
    marginBottom: 60,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  wrap: {
    padding: 20,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainWhite1,
    borderRadius: 5,
    gap: 20,
    ...Shadow,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: Size.normalMiddle,
  },
});
