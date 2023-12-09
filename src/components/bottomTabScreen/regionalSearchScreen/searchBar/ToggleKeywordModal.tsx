import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/layout/Button';
import KeywordsModal from 'components/common/modal/KeywordsModal';
import { Colors } from 'const/global-styles';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

export default function ToggleKeywordModal() {
  const [toggleModal, setToggleModal] = useState(false);

  const toggleModalHandler = () => {
    setToggleModal(prev => !prev);
  };

  return (
    <>
      <Button onPress={toggleModalHandler} style={styles.searchIcon}>
        <Ionicons name="flash" size={30} color={Colors.mainGreen2} />
      </Button>
      <KeywordsModal toggleModal={toggleModal} toggleModalHandler={toggleModalHandler} />
    </>
  );
}

const styles = StyleSheet.create({
  searchIcon: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
