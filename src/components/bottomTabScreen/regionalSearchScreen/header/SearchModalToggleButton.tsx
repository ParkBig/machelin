import Button from 'components/common/layout/Button';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { Colors } from 'const/global-styles';
import { useState } from 'react';
import RegionalSearchModal from './RegionalSearchModal';
import SearchState from './SearchState';

export default function SearchModalToggleButton() {
  const [toggleModal, setToggleModal] = useState(false);

  const toggleModalHandler = () => {
    setToggleModal(prev => !prev);
  };

  return (
    <>
      <SearchState toggleModalHandler={toggleModalHandler} />
      <Button style={styles.button} onPress={toggleModalHandler}>
        <Ionicons name="search" size={40} color={Colors.mainGreen2} />
        <RegionalSearchModal toggleModal={toggleModal} toggleModalHandler={toggleModalHandler} />
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
