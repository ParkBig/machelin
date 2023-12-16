import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/layout/Button';
import { Colors } from 'const/global-styles';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import ReportModal from './ReportModal';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';

interface Props {
  postId: number;
  isPublic: boolean;
}

export default function Report({ postId, isPublic }: Props) {
  const [toggleReportModal, setToggleReportModal] = useState(false);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const isNotPublicAlertHandler = () => {
    setToggleAlertModal({ toggle: true, alertMsg: '비공개 게시글입니다.' });
  };

  const toggleReportModalHandler = () => {
    setToggleReportModal(prev => !prev);
  };

  return (
    <>
      {!isPublic && (
        <Button onPress={isNotPublicAlertHandler}>
          <Ionicons style={styles.ionicons} name="lock-closed-outline" size={30} color={Colors.gray} />
        </Button>
      )}
      <Button onPress={toggleReportModalHandler}>
        <Ionicons style={styles.ionicons} name="ellipsis-vertical" size={20} color={Colors.gray} />
      </Button>
      <ReportModal postId={postId} toggleModal={toggleReportModal} toggleModalHandler={toggleReportModalHandler} />
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </>
  );
}

const styles = StyleSheet.create({
  ionicons: {
    paddingLeft: 5,
    textAlign: 'right',
    textAlignVertical: 'center',
  },
});
