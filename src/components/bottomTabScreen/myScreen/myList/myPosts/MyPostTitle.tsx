import Button from 'components/common/layout/Button';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Size } from 'const/global-styles';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screen/screenType';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { useState } from 'react';
import { PermissionStatus, requestForegroundPermissionsAsync } from 'expo-location';

export default function MyPostTitle() {
  const { navigate } = useNavigation<UseNavigation<'MyScreen'>>();
  const { myInfo } = useMyInfoQuery();
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const goToMakePostHandler = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== PermissionStatus.GRANTED) {
      setToggleAlertModal({ toggle: true, alertMsg: '위치 접근 권한이 필요합니다' });
      return;
    }

    if (!myInfo?.authUser) {
      setToggleAlertModal({ toggle: true, alertMsg: '로그인 후 이용가능합니다' });
      return;
    }

    navigate('MakePostScreen', {
      restaurantInfo: null,
    });
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.titleText}>나의 게시글</Text>
      <Button onPress={goToMakePostHandler}>
        <Ionicons name="add-outline" size={30} />
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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 15,
  },
  titleText: {
    fontSize: Size.normalMiddle,
    fontWeight: 'bold',
  },
});
