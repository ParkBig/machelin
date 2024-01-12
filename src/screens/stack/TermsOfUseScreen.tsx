import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { Colors, Size } from 'const/global-styles';
import { useState } from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { UseNavigation } from 'types/screenType';

export default function TermsOfUseScreen() {
  const { navigate } = useNavigation<UseNavigation<'TermsOfUseScreen'>>();
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const goToTermsOfUsePageHandler = async () => {
    const supported = await Linking.canOpenURL('https://sites.google.com/view/machelin-privacy/%ED%99%88');

    if (supported) {
      await Linking.openURL('https://sites.google.com/view/machelin-privacy/%ED%99%88');
    } else {
      setToggleAlertModal({ toggle: true, alertMsg: '현재 사이트 이용 불가능합니다' });
    }
  };

  const goToMobileVerificationScreenHandler = () => {
    navigate('MobileVerificationScreen');
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.content}>
        <Text>개인 정보 수집/이용 동의하십니까?</Text>
        <Button onPress={goToTermsOfUsePageHandler}>
          <Text style={styles.showDetailButtonText}>상세보기</Text>
        </Button>
      </View>
      <Button style={styles.button} onPress={goToMobileVerificationScreenHandler}>
        <Text style={styles.buttonText}>동의합니다</Text>
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
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: Colors.mainWhite1,
    gap: 15,
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainGreen1,
    borderRadius: 10,
  },
  showDetailButtonText: {
    fontSize: Size.normalMiddle,
    textDecorationLine: 'underline',
  },
  buttonText: {
    color: Colors.mainWhite3,
    fontSize: Size.bigSmall,
    fontWeight: 'bold',
  },
});
