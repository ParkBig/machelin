import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { Colors } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { UseNavigation } from 'types/screenType';

export default function Options() {
  const { navigate } = useNavigation<UseNavigation<'NeighborhoodPostsScreen'>>();
  const { myInfo } = useMyInfoQuery();
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const goToMakePostHandler = async () => {
    if (!myInfo?.authUser) {
      setToggleAlertModal({ toggle: true, alertMsg: '로그인 후 이용가능합니다' });
      return;
    }

    navigate('MakePostScreen', {
      restaurantInfo: null,
    });
  };

  const goToTobTabScreenHandler = () => {
    navigate('NeighborHoodPostsTopTabScreen');
  };

  return (
    <View style={styles.options}>
      <Button style={styles.button} onPress={goToMakePostHandler}>
        <Ionicons name="add" size={30} color={Colors.mainWhite3} />
      </Button>
      <Button style={styles.button} onPress={goToTobTabScreenHandler}>
        <Ionicons name="search" size={30} color={Colors.mainWhite3} />
      </Button>
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  options: {
    flexDirection: 'row',
    gap: 10,
  },
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
