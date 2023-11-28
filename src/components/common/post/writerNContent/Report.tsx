import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/Button';
import { Size } from 'const/global-styles';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import ReportModal from './ReportModal';

interface Props {
  postId: number;
}

export default function Report({ postId }: Props) {
  const [toggleReportModal, setToggleReportModal] = useState(false);

  const toggleReportModalHandler = () => {
    setToggleReportModal(prev => !prev);
  };

  return (
    <>
      <Button style={styles.button} onPress={toggleReportModalHandler}>
        <Ionicons name="ellipsis-vertical-outline" size={Size.bigSmall} />
      </Button>
      <ReportModal postId={postId} toggleModal={toggleReportModal} toggleModalHandler={toggleReportModalHandler} />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 30,
    width: 25,
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
