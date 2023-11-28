import Button from 'components/common/Button';
import { Ionicons } from '@expo/vector-icons';
import KeywordsModal from 'components/machelinLankScreen/searchBar/KeywordsModal';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Colors, Shadow } from 'const/global-styles';

export default function Keywords() {
  const [toggleKeywordModal, setToggleKeywordModal] = useState(false);

  const toggleModalHandler = () => {
    setToggleKeywordModal(prev => !prev);
  };

  return (
    <>
      <Button onPress={toggleModalHandler} style={styles.icon}>
        <Ionicons name="flash" size={30} color={Colors.mainWhite3} />
      </Button>
      <KeywordsModal toggleModal={toggleKeywordModal} toggleModalHandler={toggleModalHandler} />
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: 50,
    width: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainGreen2,
    ...Shadow,
  },
});
