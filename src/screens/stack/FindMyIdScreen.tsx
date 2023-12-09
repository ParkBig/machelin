import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { Colors, Size } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { sendFindMyIdVerificationQuery, checkFindMyIdVerificationQuery } from 'query/user';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useMutation } from 'react-query';
import { UseNavigation } from 'types/screen/screenType';
import { storeToken } from 'util/tokenDB';

export default function FindMyIdScreen() {
  const { navigate } = useNavigation<UseNavigation<'FindMyIdScreen'>>();
  const { reMyInfo } = useMyInfoQuery();
  const [isEditable, setIsEditable] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const { mutate: sendVerifyMutate } = useMutation(sendFindMyIdVerificationQuery, {
    onSuccess: res => {
      if (res.ok) {
        setIsEditable(false);
      } else {
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
  });

  const { mutate: checkVerifyMutate } = useMutation(checkFindMyIdVerificationQuery, {
    onSuccess: async res => {
      if (res.ok) {
        await storeToken(res.token);
        reMyInfo();
        navigate('MyScreen');
      } else {
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
  });

  const onChangeTextHandler = (isPhoneInput: boolean, text: string) => {
    if (isPhoneInput) {
      setPhoneNumber(text);
    } else {
      setVerificationCode(text);
    }
  };

  const onPressHandler = (isPhoneInput: boolean) => {
    if (isPhoneInput) {
      sendVerifyMutate(phoneNumber);
    } else {
      checkVerifyMutate({ phoneNumber, verificationCode });
    }
  };

  return (
    <>
      <View style={styles.wrap}>
        <View style={styles.phoneNumber}>
          <TextInput
            style={styles.textInput}
            value={phoneNumber}
            editable={isEditable}
            onChangeText={onChangeTextHandler.bind(null, true)}
            placeholder="(-) 없이 입력해주세요."
            keyboardType="phone-pad"
          />
          {isEditable && (
            <Button style={styles.button} onPress={onPressHandler.bind(null, true)}>
              <Text style={styles.buttonText}>인증번호 발송</Text>
            </Button>
          )}
        </View>
        {!isEditable && (
          <View style={styles.verify}>
            <TextInput
              style={styles.textInput}
              value={verificationCode}
              onChangeText={onChangeTextHandler.bind(null, false)}
            />
            <Button style={styles.button} onPress={onPressHandler.bind(null, false)}>
              <Text style={styles.buttonText}>인증하기</Text>
            </Button>
          </View>
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
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: Colors.mainWhite1,
    gap: 20,
  },
  email: {
    width: '100%',
  },
  phoneNumber: {
    width: '100%',
    gap: 20,
  },
  verify: {
    width: '100%',
    gap: 20,
  },
  textInput: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.mainGreen2,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.mainGreen2,
  },
  buttonText: {
    fontSize: Size.normalMiddle,
    color: Colors.mainWhite3,
  },
});
