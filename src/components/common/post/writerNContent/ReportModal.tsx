import Button from 'components/common/Button';
import { Colors, Shadow } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import Modal from 'react-native-modal';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { reportPostQuery } from 'query/posts';
import ConfirmAlertModal, { ToggleState } from 'components/common/ConfirmAlertModal';

interface Props {
  postId: number;
  toggleModal: boolean;
  toggleModalHandler: () => void;
}

const reportButtons: RadioButtonProps[] = [
  {
    id: '부적절한 내용',
    label: '부적절한 내용',
    value: '부적절한 내용',
    containerStyle: {
      width: '100%',
    },
  },
  {
    id: '폭력적인 내용',
    label: '폭력적인 내용',
    value: '폭력적인 내용',
    containerStyle: {
      width: '100%',
    },
  },
  {
    id: '혐오적인 내용',
    label: '혐오적인 내용',
    value: '혐오적인 내용',
    containerStyle: {
      width: '100%',
    },
  },
  {
    id: '스팸 내용',
    label: '스팸 내용',
    value: '스팸 내용',
    containerStyle: {
      width: '100%',
    },
  },
];

export default function ReportModal({ postId, toggleModal, toggleModalHandler }: Props) {
  const [selectedButton, setSelectedButton] = useState('');
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });
  const { mutate } = useMutation(reportPostQuery, {
    onSuccess: res => {
      if (res.ok) {
        closeModalHandler();
      } else {
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
    onError: () => {
      setToggleAlertModal({ toggle: true, alertMsg: '서버가 잠시 아픈거 같아요...' });
    },
  });

  const closeModalHandler = () => {
    toggleModalHandler();
    setSelectedButton('');
  };

  const reportHandler = () => {
    if (selectedButton) {
      mutate({ postId, report: selectedButton });
    }
  };

  return (
    <Modal
      style={styles.modal}
      isVisible={toggleModal}
      onSwipeComplete={closeModalHandler}
      onBackButtonPress={closeModalHandler}
      swipeDirection={['down']}
      useNativeDriverForBackdrop
    >
      <View style={styles.wrap}>
        <View style={styles.title}>
          <Text>신고하기</Text>
        </View>
        <View style={styles.reports}>
          <RadioGroup
            radioButtons={reportButtons}
            onPress={setSelectedButton}
            selectedId={selectedButton}
            containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          />
        </View>
        <View style={styles.buttons}>
          <Button style={styles.button} onPress={closeModalHandler}>
            <Text>취소</Text>
          </Button>
          <Button style={styles.button} onPress={reportHandler}>
            <Text>확인</Text>
          </Button>
        </View>
      </View>
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
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
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.mainGreen1,
    gap: 20,
    ...Shadow,
  },
  title: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reports: {
    width: '100%',
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
