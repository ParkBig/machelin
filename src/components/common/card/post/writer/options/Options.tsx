import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/layout/Button';
import { Colors } from 'const/global-styles';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import OptionsModals from './optionsModals/OptionsModals';

interface Props {
  postId: number;
  ownerId: number;
  isPublic: boolean;
}

export default function Options({ postId, ownerId, isPublic }: Props) {
  const [toggleReportModal, setToggleReportModal] = useState(false);

  const toggleReportModalHandler = () => {
    setToggleReportModal(prev => !prev);
  };

  return (
    <>
      <Button onPress={toggleReportModalHandler}>
        <Ionicons style={styles.ionicons} name="ellipsis-vertical" size={20} color={Colors.gray} />
      </Button>
      <OptionsModals
        postId={postId}
        ownerId={ownerId}
        isPublic={isPublic}
        toggleModal={toggleReportModal}
        toggleModalHandler={toggleReportModalHandler}
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
