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
import { makePostState } from 'store/makePostState';
import { Colors, Size } from 'const/global-styles';
import { useState } from 'react';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';

export default function GetImg() {
  const setMakePostInfo = useSetRecoilState(makePostState);
  const [isImagesLoading, setIsImagesLoading] = useState(false);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const addPhotosHandler = async () => {
    const { status } = await requestMediaLibraryPermissionsAsync();
    if (status !== PermissionStatus.GRANTED) {
      setToggleAlertModal({ toggle: true, alertMsg: '앨범 접근 권한이 필요합니다' });
      return;
    }

    setIsImagesLoading(true);
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 0.2,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      if (result.assets.length > 5) {
        setToggleAlertModal({ toggle: true, alertMsg: '사진은 최대 5개까지 가능합니다.' });
        return;
      }

      const getImages = result.assets.map(asset => asset.uri);
      setMakePostInfo(prev => ({ ...prev, images: [...prev.images, ...getImages] }));
    }

    setIsImagesLoading(false);
  };

  return (
    <>
      <View style={styles.wrap}>
        <View style={styles.textWrap}>
          <Ionicons name="images-outline" size={35} />
          {isImagesLoading ? <Text>로딩중...</Text> : <Text>남겨볼까요?</Text>}
        </View>
        {isImagesLoading ? (
          <LoadingOverlay style={styles.loadingOverlay} size={40} color={Colors.mainGreen3} />
        ) : (
          <Button style={styles.button} onPress={addPhotosHandler}>
            <Text style={styles.buttonText}>사진추가하기</Text>
            <Ionicons name="chevron-forward" size={25} color={Colors.darkGray} />
          </Button>
        )}
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
  loadingOverlay: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
