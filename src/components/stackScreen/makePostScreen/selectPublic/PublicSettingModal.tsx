import Button from 'components/common/layout/Button';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { useRecoilState } from 'recoil';
import { makePostState } from 'store/makePostState';

interface Props {
  togglePublicModal: boolean;
  toggleModal: () => void;
}

export default function PublicSettingModal({ togglePublicModal, toggleModal }: Props) {
  const [makePostInfo, setMakePostInfo] = useRecoilState(makePostState);

  const changePublicSettingHandler = (state: boolean) => {
    setMakePostInfo(prev => ({ ...prev, isPublic: state }));
  };

  return (
    <Modal
      style={styles.modal}
      isVisible={togglePublicModal}
      onSwipeComplete={toggleModal}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
      swipeDirection={['down']}
      useNativeDriverForBackdrop
    >
      <View style={styles.wrap}>
        <View style={styles.title}>
          <Text style={styles.titleText}>공개범위</Text>
        </View>
        <View style={styles.selection}>
          <Button style={styles.selectButton} onPress={changePublicSettingHandler.bind(null, true)}>
            <View style={styles.selectionTitle}>
              <Ionicons name="people-outline" size={Size.bigBig} />
              <Text>전체 공개</Text>
            </View>
            {makePostInfo.isPublic && <Ionicons name="checkmark-outline" size={Size.bigBig} />}
          </Button>
          <Button style={styles.selectButton} onPress={changePublicSettingHandler.bind(null, false)}>
            <View style={styles.selectionTitle}>
              <Ionicons name="lock-open-outline" size={Size.bigBig} />
              <Text>나만 보기</Text>
            </View>
            {!makePostInfo.isPublic && <Ionicons name="checkmark-outline" size={Size.bigBig} />}
          </Button>
        </View>
        <Button style={styles.doneButton} onPress={toggleModal}>
          <Text style={styles.doneButtonText}>완료</Text>
        </Button>
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
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: Colors.mainWhite1,
    gap: 20,
  },
  title: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.mainGreen2,
    borderBottomWidth: 1,
  },
  selection: {
    gap: 5,
  },
  selectButton: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectionTitle: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  doneButton: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.mainGreen1,
  },
  doneButtonText: {
    fontWeight: 'bold',
    color: Colors.mainWhite3,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: Size.normalMiddle,
  },
});
