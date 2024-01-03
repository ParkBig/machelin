import Button from 'components/common/layout/Button';
import { Colors, Size } from 'const/global-styles';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  MediaTypeOptions,
  PermissionStatus,
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import { useMutation } from 'react-query';
import { modifyUserImageQuery } from 'query/user';
import mime from 'mime';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { useState } from 'react';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';

export default function MyImage() {
  const { myInfo, reMyInfo } = useMyInfoQuery();
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const { mutate } = useMutation(modifyUserImageQuery, {
    onSuccess: res => {
      if (res.ok) {
        reMyInfo();
      } else {
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
    onError: () => {
      setToggleAlertModal({ toggle: true, alertMsg: '서버가 잠시 아픈거 같아요...' });
    },
  });

  const changeImageHandler = async () => {
    const { status } = await requestMediaLibraryPermissionsAsync();
    if (status !== PermissionStatus.GRANTED) {
      setToggleAlertModal({ toggle: true, alertMsg: '앨범 접근 권한이 필요합니다' });
      return;
    }

    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.2,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const now = Date.now();
      const payloadFormData = new FormData();

      //@ts-ignore
      payloadFormData.append('image', {
        uri,
        type: mime.getType(uri),
        name: `user${myInfo?.authUser?.id}_pfp_${now}`,
      });

      mutate(payloadFormData);
    }
  };

  const changeToDefaultImageHandler = () => {
    if (!myInfo?.authUser?.pfp) return;

    const payloadFormData = new FormData();
    payloadFormData.append('image', '');

    mutate(payloadFormData);
  };

  const imageSource = myInfo?.authUser?.pfp ? { uri: myInfo?.authUser?.pfp } : require('assets/png/user.png');

  return (
    <>
      <View style={styles.wrap}>
        <View style={styles.pfp}>
          <Image
            style={styles.image}
            source={imageSource}
            resizeMode="contain"
          />
          <Button style={styles.changeImageButton} onPress={changeImageHandler}>
            <Ionicons name="camera" size={Size.colossalSmall} />
          </Button>
        </View>
        <Button onPress={changeToDefaultImageHandler}>
          <Text style={styles.text}>기본이미지로 변경</Text>
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
    width: '100%',
    paddingVertical: 25,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  pfp: {
    height: 130,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 65,
  },
  changeImageButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderColor: Colors.mainGreen1,
    borderWidth: 1,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.mainWhite1,
  },
  text: {
    fontSize: Size.small,
  },
});
