import { Colors, Shadow, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import Button from 'components/common/layout/Button';
import { UseMutateFunction } from 'react-query';

interface Props {
  toggleModal: boolean;
  alertMsg: string;
  setToggleAlertModal: React.Dispatch<React.SetStateAction<ToggleState>>;
  mutate: UseMutateFunction<any, unknown, any, unknown>;
  argument: any;
}

export interface ToggleState {
  toggle: boolean;
  alertMsg: string;
}

export default function YesOrNoModal({ toggleModal, alertMsg, setToggleAlertModal, mutate, argument }: Props) {
  const okHandler = () => {
    mutate(argument);
    setToggleAlertModal({ toggle: false, alertMsg: '' });
  };

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
        <View style={styles.buttons}>
          <Button style={styles.button} onPress={okHandler}>
            <Text style={styles.text}>확인</Text>
          </Button>
          <Button style={styles.button} onPress={closeModalHandler}>
            <Text style={styles.text}>취소</Text>
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
    padding: 20,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainWhite1,
    borderRadius: 5,
    gap: 20,
    ...Shadow,
  },
  buttons: {
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
