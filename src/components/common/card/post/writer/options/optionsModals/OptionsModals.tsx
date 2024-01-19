import { StyleSheet, Text, View } from 'react-native';
import { Colors, Shadow, Size } from 'const/global-styles';
import Modal from 'react-native-modal';
import Button from 'components/common/layout/Button';
import { useState } from 'react';
import Report from './Report';
import Delete from './Delete';
import PublicSetting from './PublicSetting';
import { Ionicons } from '@expo/vector-icons';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { useNavigationState } from '@react-navigation/native';
import Line from 'components/common/layout/Line';

interface Props {
  postId: number;
  ownerId: number;
  isPublic: boolean;
  toggleModal: boolean;
  toggleModalHandler: () => void;
}

export type WhichOneSelectedState = 'report' | 'delete' | 'publicSetting' | null;

export default function OptionsModals({ postId, toggleModal, ownerId, isPublic, toggleModalHandler }: Props) {
  const navigationState = useNavigationState(state => state);
  const { myInfo } = useMyInfoQuery();
  const [whichOneSelected, setWhichOneSelected] = useState<WhichOneSelectedState>(null);

  const changeWhichOneSelectedHandler = (whichOne: WhichOneSelectedState) => {
    setWhichOneSelected(whichOne);
  };

  const closeModalHandler = () => {
    if (whichOneSelected) {
      setWhichOneSelected(null);
      return;
    }

    toggleModalHandler();
  };

  const renderSelected =
    whichOneSelected === 'report' ? (
      <Report postId={postId} setWhichOneSelected={setWhichOneSelected} toggleModalHandler={toggleModalHandler} />
    ) : whichOneSelected === 'delete' ? (
      <Delete postId={postId} setWhichOneSelected={setWhichOneSelected} toggleModalHandler={toggleModalHandler} />
    ) : (
      <PublicSetting
        postId={postId}
        isPublic={isPublic}
        setWhichOneSelected={setWhichOneSelected}
        toggleModalHandler={toggleModalHandler}
      />
    );

  const isMyScreen = navigationState.routes[navigationState.index].name === 'MyPostsScreen' ? true : false;

  return (
    <Modal
      style={styles.modal}
      isVisible={toggleModal}
      onSwipeComplete={closeModalHandler}
      onBackButtonPress={closeModalHandler}
      onBackdropPress={closeModalHandler}
      swipeDirection={['down']}
      useNativeDriverForBackdrop
    >
      <View style={styles.wrap}>
        {whichOneSelected === null ? (
          <>
            <Button style={styles.button} onPress={changeWhichOneSelectedHandler.bind(null, 'report')}>
              <Ionicons name="alert" size={Size.bigMiddle} />
              <Text>신고하기</Text>
            </Button>
            {myInfo?.authUser && myInfo.authUser.id === ownerId && isMyScreen && (
              <>
                <Button style={styles.button} onPress={changeWhichOneSelectedHandler.bind(null, 'delete')}>
                  <Ionicons name="trash" size={Size.bigMiddle} />
                  <Text>삭제하기</Text>
                </Button>
                <Button style={styles.button} onPress={changeWhichOneSelectedHandler.bind(null, 'publicSetting')}>
                  <Ionicons name="lock-open" size={Size.bigMiddle} />
                  <Text>공개설정</Text>
                </Button>
              </>
            )}
            <Line style={styles.line} />
            <Button style={styles.closeButton} onPress={closeModalHandler}>
              <Text style={styles.closeButtonText}>닫기</Text>
            </Button>
          </>
        ) : (
          renderSelected
        )}
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
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: Colors.mainWhite1,
  },
  button: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  line: {
    height: 20,
  },
  closeButton: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.mainGreen2,
  },
  closeButtonText: {
    color: Colors.mainWhite3,
    fontWeight: 'bold',
  },
});
