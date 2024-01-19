import Button from 'components/common/layout/Button';
import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { WhichOneSelectedState } from './OptionsModals';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import { reportPostQuery } from 'query/api/posts';

interface Props {
  postId: number;
  setWhichOneSelected: React.Dispatch<React.SetStateAction<WhichOneSelectedState>>;
  toggleModalHandler: () => void;
}

export default function Report({ postId, setWhichOneSelected, toggleModalHandler }: Props) {
  const [selectedButton, setSelectedButton] = useState('');
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const { mutate, isLoading } = useMutation(reportPostQuery, {
    onSuccess: res => {
      if (res.ok) {
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

  const reportHandler = () => {
    if (selectedButton) {
      mutate({ postId, report: selectedButton });
    }
  };

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>신고하기</Text>
      </View>
      <View style={styles.reports}>
        <RadioGroup
          radioButtons={reportButtons}
          onPress={setSelectedButton}
          selectedId={selectedButton}
          containerStyle={{ justifyContent: 'center', alignItems: 'center', gap: 20, }}
        />
      </View>
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={closeSelectedHandler}>
          <Text style={styles.buttonText}>취소</Text>
        </Button>
        <Button style={styles.button} onPress={reportHandler}>
          <Text style={styles.buttonText}>확인</Text>
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
    borderBottomColor: Colors.mainGreen2,
    borderBottomWidth: 1,
  },
  reports: {
    width: '100%',
    paddingVertical: 20,
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
    backgroundColor :Colors.mainGreen2,
  },
  buttonText: {
    color: Colors.mainWhite3,
    fontWeight: 'bold',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: Size.normalMiddle,
  },
  loadingOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});

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
