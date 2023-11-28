import { ScreenHeight } from 'const/dimenstions';
import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import LeaveAComment from './LeaveAComment';
import Comments from './Comments';

interface Props {
  postId: number;
  toggleModal: boolean;
  toggleModalHandler: () => void;
}

export default function CommentsModal({ postId, toggleModal, toggleModalHandler }: Props) {
  return (
    <Modal
      style={styles.modal}
      propagateSwipe
      isVisible={toggleModal}
      onSwipeComplete={toggleModalHandler}
      onBackdropPress={toggleModalHandler}
      onBackButtonPress={toggleModalHandler}
      swipeDirection={['down']}
      useNativeDriverForBackdrop
    >
      <View style={styles.wrap}>
        <View style={styles.dragAndTitle}>
          <Ionicons name="remove-outline" size={Size.colossalBig} />
          <View style={styles.title}>
            <Text style={styles.text}>댓글</Text>
          </View>
        </View>
        <Comments postId={postId} />
        <LeaveAComment postId={postId} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  wrap: {
    width: '100%',
    height: ScreenHeight / 2,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: Colors.mainWhite1,
  },
  dragAndTitle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomColor: Colors.mainGreen1,
    borderBottomWidth: 2,
  },
  text: {
    fontWeight: 'bold',
  },
  comments: {
    flex: 1,
  },
});
