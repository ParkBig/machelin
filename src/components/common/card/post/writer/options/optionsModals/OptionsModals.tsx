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

  const isMyScreen = navigationState.routes[navigationState.index].name === 'MyScreen' ? true : false;

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
              <Text style={styles.text}>신고하기</Text>
            </Button>
            {myInfo?.authUser && myInfo.authUser.id === ownerId && isMyScreen && (
              <>
                <Button style={styles.button} onPress={changeWhichOneSelectedHandler.bind(null, 'delete')}>
                  <Ionicons name="trash" size={Size.bigMiddle} />
                  <Text style={styles.text}>삭제하기</Text>
                </Button>
                <Button style={styles.button} onPress={changeWhichOneSelectedHandler.bind(null, 'publicSetting')}>
                  <Ionicons name="lock-open" size={Size.bigMiddle} />
                  <Text style={styles.text}>공개설정</Text>
                </Button>
              </>
            )}
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
    marginBottom: 60,
    justifyContent: 'center',
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
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontSize: Size.normalMiddle,
  },
});
