import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { Colors } from 'const/global-styles';
import { PermissionStatus, requestForegroundPermissionsAsync } from 'expo-location';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UseNavigation } from 'types/screenType';
import { Ionicons } from '@expo/vector-icons';

export default function MakePost() {
  const { navigate } = useNavigation<UseNavigation<'MyPostsScreen'>>();
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const goToMakePostHandler = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== PermissionStatus.GRANTED) {
      setToggleAlertModal({ toggle: true, alertMsg: '위치 접근 권한이 필요합니다' });
      return;
    }

    navigate('MakePostScreen', {
      restaurantInfo: null,
    });
  };

  return (
    <View style={styles.wrap}>
      <Button style={styles.button} onPress={goToMakePostHandler}>
        <Ionicons style={styles.ionicons} name='reader' size={35} color={Colors.mainWhite3} />
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
  wrap: {
    height: 90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 27.5,
    backgroundColor: Colors.mainGreen2,
    position: 'absolute',
    right: 20,
  },
  ionicons: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
