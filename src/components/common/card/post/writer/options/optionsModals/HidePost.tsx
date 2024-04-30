import Button from 'components/common/layout/Button';
import { Colors, Size } from 'const/global-styles';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { WhichOneSelectedState } from './OptionsModals';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { useState } from 'react';
import { useMutation } from 'react-query';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import Line from 'components/common/layout/Line';
import { toggleUserPostBlockQuery } from 'query/api/user';

interface Props {
  postId: number;
  setWhichOneSelected: React.Dispatch<React.SetStateAction<WhichOneSelectedState>>;
  toggleModalHandler: () => void;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HidePost({ postId, setWhichOneSelected, toggleModalHandler, setIsVisible }: Props) {
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const { mutate, isLoading } = useMutation(toggleUserPostBlockQuery, {
    onSuccess: res => {
      if (res.ok) {
        setIsVisible(false);
        setWhichOneSelected(null);
        toggleModalHandler();
      } else {
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
    onError: () => {
      setToggleAlertModal({ toggle: true, alertMsg: '서버가 잠시 아픈거 같아요...' });
    },
  });

  const closeSelectedHandler = () => {
    setWhichOneSelected(null);
  };

  const hidePostHandler = () => {
    mutate({ postId });
  };

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>게시글을 보지 않겠습니까?</Text>
      </View>
      <Line style={styles.line} />
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={closeSelectedHandler}>
          <Text style={styles.buttonText}>아니요</Text>
        </Button>
        <Button style={styles.button} onPress={hidePostHandler}>
          <Text style={styles.buttonText}>네</Text>
        </Button>
      </View>
      {isLoading && <LoadingOverlay style={styles.loadingOverlay} />}
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 20,
    width: '100%',
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    flex: 1,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainGreen2,
  },
  titleText: {
    fontSize: Size.normalMiddle,
    fontWeight: 'bold',
  },
  buttonText: {
    color: Colors.mainWhite3,
    fontWeight: 'bold',
  },
  loadingOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
