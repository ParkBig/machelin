import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/layout/Button';
import {
  MediaTypeOptions,
  PermissionStatus,
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import { useSetRecoilState } from 'recoil';
import { Colors, Size } from 'const/global-styles';
import { useState } from 'react';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { makeStampState } from 'store/makeStampState';

export default function GetImg() {
  const setMakeStampValues = useSetRecoilState(makeStampState);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const addPhotosHandler = async () => {
    const { status } = await requestMediaLibraryPermissionsAsync();
    if (status !== PermissionStatus.GRANTED) {
      setToggleAlertModal({ toggle: true, alertMsg: '앨범 접근 권한이 필요합니다' });
      return;
    }

    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    if (!result.canceled) {
      const getImages = result.assets.map(asset => asset.uri);
      setMakeStampValues(prev => ({ ...prev, images: [...prev.images, ...getImages] }));
    }
  };

  return (
    <>
      <View style={styles.wrap}>
        <View style={styles.textWrap}>
          <Ionicons name="images-outline" size={35} />
          <Text>남겨볼까요?</Text>
        </View>
        <Button style={styles.button} onPress={addPhotosHandler}>
          <Text style={styles.buttonText}>사진추가하기</Text>
          <Ionicons name="chevron-forward" size={25} color={Colors.darkGray} />
        </Button>
      </View>
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrap: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: Colors.darkGray,
    fontSize: Size.normalMiddle,
  },
});
