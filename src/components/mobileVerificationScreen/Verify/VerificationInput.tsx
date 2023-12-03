import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/Button';
import { Colors, Shadow, Size } from 'const/global-styles';
import { checkSignUpVerificationQuery } from 'query/user';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useMutation } from 'react-query';
import { UseNavigation } from 'types/screen/screenType';

interface Props {
  isClickedSendVerify: boolean;
  phoneNumber: string;
}

export default function VerificationInput({ isClickedSendVerify, phoneNumber }: Props) {
  const { navigate } = useNavigation<UseNavigation<'MobileVerificationScreen'>>();
  const [verificationCode, setVerificationCode] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const { mutate } = useMutation(checkSignUpVerificationQuery, {
    onSuccess: res => {
      if (res.ok) {
        navigate('SignUpScreen', {
          mobile: phoneNumber,
        });
        return;
      }
      if (!res.ok && res.msg) {
        setAlertMsg(res.msg);
      }
    },
  });

  const onTextChangeHandler = (text: string) => {
    setVerificationCode(text);
  };

  const checkVerifyHandler = () => {
    mutate({ phoneNumber, verificationCode });
  };

  return (
    <View style={styles.wrap}>
      {isClickedSendVerify && (
        <>
          <TextInput
            style={styles.textInput}
            value={verificationCode}
            onChangeText={onTextChangeHandler}
            placeholder="인증번호 입력"
            keyboardType="phone-pad"
          />
          <View style={styles.alert}>
            <Text>{alertMsg}</Text>
          </View>
          <Button style={styles.button} onPress={checkVerifyHandler}>
            <Text style={styles.buttonText}>인증하기</Text>
          </Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  textInput: {
    height: 60,
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.mainGreen2,
    fontSize: Size.normalMiddle,
    textAlign: 'center',
  },
  alert: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  alertText: {
    color: 'tomato',
  },
  button: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Colors.mainGreen2,
    ...Shadow,
  },
  buttonText: {
    fontSize: Size.normalMiddle,
    color: Colors.mainWhite1,
    fontWeight: 'bold',
  },
});
