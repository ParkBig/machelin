import Button from 'components/common/Button';
import { Colors, Shadow, Size } from 'const/global-styles';
import { useState } from 'react';
import { LayoutAnimation, StyleSheet, Text, TextInput, View } from 'react-native';
import ReVerifyModal from './ReVerifyModal';
import { useMutation } from 'react-query';
import { sendVerificationQuery } from 'query/verify';

interface Props {
  isClickedSendVerify: boolean;
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  setIsClickedSendVerify: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileInput({
  phoneNumber,
  setPhoneNumber,
  isClickedSendVerify,
  setIsClickedSendVerify,
}: Props) {
  const [toggleConfirmReVerifyModal, setToggleConfirmReVerifyModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const { mutate } = useMutation(sendVerificationQuery, {
    onSuccess: res => {
      if (!isClickedSendVerify && res.ok) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsClickedSendVerify(true);
        return;
      }
      if (!res.ok && res.msg) {
        setAlertMsg(res.msg);
      }
    },
  });

  const onTextChangeHandler = (text: string) => {
    setPhoneNumber(text);
  };

  const toggleConfirmReVerifyModalHandler = () => {
    setToggleConfirmReVerifyModal(prev => !prev);
  };

  const doVerifyHandler = () => {
    if (isClickedSendVerify) {
      setToggleConfirmReVerifyModal(true);
      return;
    }
    setAlertMsg('');
    mutate(phoneNumber);
  };

  const reVerifyHandler = () => {
    toggleConfirmReVerifyModalHandler();
    mutate(phoneNumber);
  };

  return (
    <>
      <View style={styles.wrap}>
        <TextInput
          style={styles.textInput}
          value={phoneNumber}
          onChangeText={onTextChangeHandler}
          placeholder="(-) 없이 입력해주세요."
          keyboardType="phone-pad"
        />
        <View style={styles.alert}>
          <Text style={styles.alertText}>{alertMsg}</Text>
        </View>
        <Button style={styles.button} onPress={doVerifyHandler}>
          <Text style={styles.buttonText}>인증번호 발송</Text>
        </Button>
      </View>
      <ReVerifyModal
        toggleModal={toggleConfirmReVerifyModal}
        toggleModalHandler={toggleConfirmReVerifyModalHandler}
        reVerifyHandler={reVerifyHandler}
      />
    </>
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
