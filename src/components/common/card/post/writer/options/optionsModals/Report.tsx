import Button from 'components/common/layout/Button';
import { Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { reportPostQuery } from 'query/posts';
import { WhichOneSelectedState } from './OptionsModals';
import { Ionicons } from '@expo/vector-icons';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';

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
        <Ionicons name="alert" size={Size.bigMiddle} />
        <Text style={styles.titleText}>신고하기</Text>
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
        <Button style={styles.button} onPress={closeSelectedHandler}>
          <Text>취소</Text>
        </Button>
        <Button style={styles.button} onPress={reportHandler}>
          <Text>확인</Text>
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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
