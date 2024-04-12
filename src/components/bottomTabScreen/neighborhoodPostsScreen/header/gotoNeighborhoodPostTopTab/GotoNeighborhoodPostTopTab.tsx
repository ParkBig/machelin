import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { Colors } from 'const/global-styles';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { UseNavigation } from 'types/screenType';

export default function GotoNeighborhoodPostTopTab() {
  const { navigate } = useNavigation<UseNavigation<'NeighborhoodPostsScreen'>>();
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const goToTobTabScreenHandler = () => {
    navigate('NeighborHoodPostsTopTabScreen');
  };

  return (
    <>
      <Button style={styles.button} onPress={goToTobTabScreenHandler}>
        <Ionicons name="search" size={30} color={Colors.mainWhite3} />
      </Button>
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.mainWhite3,
  },
});
