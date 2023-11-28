import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

interface Props {
  toggleModal: boolean;
  toggleModalHandler: () => void;
}

export default function ImageDetailModal({ toggleModal, toggleModalHandler }: Props) {
  return (
    <Modal
      style={styles.modal}
      isVisible={toggleModal}
      onBackButtonPress={toggleModalHandler}
      useNativeDriverForBackdrop
    >
      <View style={styles.wrap}></View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    marginBottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    padding: 20,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
