import { Linking, Platform, StyleSheet, Text, View } from 'react-native';
import { Colors, Shadow, Size } from 'const/global-styles';
import Modal from 'react-native-modal';
import { useEffect, useState } from 'react';
import { createAxiosInstance } from 'query/api/api';
import Button from 'components/common/layout/Button';

export default function VersionCheckModal() {
  const [isVersionCorrect, setIsVersionCorrect] = useState(false);

  const closeModalHandler = async () => {
    if (Platform.OS === 'android') {
      const supported = await Linking.canOpenURL('https://play.google.com/store/apps/details?id=com.parkbig.machelin');

      if (supported) {
        await Linking.openURL('https://play.google.com/store/apps/details?id=com.parkbig.machelin');
      }
    } else {
      setIsVersionCorrect(false)
    }
  };

  useEffect(() => {
    const versionCheck = async () => {
      const axiosVersions = createAxiosInstance('versions');
      const { data } = await axiosVersions.get('');

      if (data.machelinCurrentVersion !== '34') {
        setIsVersionCorrect(true);
      }
    };

    versionCheck();
  }, []);

  return (
    <Modal
      style={styles.modal}
      backdropOpacity={0.5}
      isVisible={isVersionCorrect}
      swipeDirection={['down']}
      useNativeDriverForBackdrop
    >
      <View style={styles.wrap}>
        <View style={styles.title}>
          <Text style={styles.titleText}>새로운 버전이 출시됬어요!</Text>
        </View>
        <Button style={styles.button} onPress={closeModalHandler}>
          <Text style={styles.buttonText}>업데이트 하러가기</Text>
        </Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    marginBottom: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  wrap: {
    padding: 20,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainWhite1,
    borderRadius: 5,
    gap: 20,
    ...Shadow,
  },
  title: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: Size.normalMiddle,
    fontWeight: 'bold'
  },
  button: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainGreen1,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: Size.normalMiddle,
    color: Colors.mainWhite1,
    fontWeight: 'bold'
  },
});
