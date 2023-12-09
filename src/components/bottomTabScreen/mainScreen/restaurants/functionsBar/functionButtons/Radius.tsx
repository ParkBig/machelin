import Button from 'components/common/layout/Button';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Colors, Shadow } from 'const/global-styles';
import RadiusModal from 'components/common/modal/RadiusModal';

export default function Radius() {
  const [toggleRadiusModal, setToggleRadiusModal] = useState(false);

  const toggleModalHandler = () => {
    setToggleRadiusModal(prev => !prev);
  };

  return (
    <>
      <Button onPress={toggleModalHandler} style={styles.button}>
        <Ionicons name="walk" size={35} color={Colors.mainWhite3} />
      </Button>
      <RadiusModal toggleModal={toggleRadiusModal} toggleModalHandler={toggleModalHandler} />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainGreen2,
    ...Shadow,
  },
});
