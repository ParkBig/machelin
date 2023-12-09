import { useNavigation, useRoute } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { Colors } from 'const/global-styles';
import { signUpQuery } from 'query/user';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useMutation } from 'react-query';
import { UseNavigation, UseRouter } from 'types/screen/screenType';

interface Infos {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
}

export default function SignUpInfos() {
  const { navigate } = useNavigation<UseNavigation<'SignUpScreen'>>();
  const { params } = useRoute<UseRouter<'SignUpScreen'>>();
  const [infos, setInfos] = useState<Infos>({ email: '', password: '', passwordCheck: '', nickname: '' });
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });
  const { mutate } = useMutation(signUpQuery, {
    onSuccess: res => {
      if (res.ok) {
        navigate('LoginScreen');
      } else {
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
    onError: () => {
      setToggleAlertModal({ toggle: true, alertMsg: '서버가 잠시 아픈거 같아요...' });
    },
  });

  const setInfosHandler = (which: 'email' | 'password' | 'nickname' | 'passwordCheck', text: string) => {
    setInfos(prev => ({ ...prev, [which]: text }));
  };

  const signUpHandler = () => {
    const mobile = params.mobile;
    const { email, password, passwordCheck, nickname } = infos;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setToggleAlertModal({ toggle: true, alertMsg: '이메일 양식을 지켜주세요' });
      return;
    }
    if (password !== passwordCheck) {
      setToggleAlertModal({ toggle: true, alertMsg: '비밀번호가 일치하지 않아요' });
      return;
    }
    if (nickname.length > 20) {
      setToggleAlertModal({ toggle: true, alertMsg: '닉네임은 최대 20자까지 가능합니다' });
      return;
    }

    mutate({ email, password, nickname, mobile });
  };

  return (
    <>
      <View style={styles.wrap}>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="이메일 입력"
          onChangeText={setInfosHandler.bind(null, 'email')}
          value={infos.email}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder="비밀번호 입력"
          onChangeText={setInfosHandler.bind(null, 'password')}
          value={infos.password}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder="비밀번호 확인"
          onChangeText={setInfosHandler.bind(null, 'passwordCheck')}
          value={infos.passwordCheck}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          placeholder="닉네임 입력(20자 이내)"
          onChangeText={setInfosHandler.bind(null, 'nickname')}
          value={infos.nickname}
        />
        <Button style={styles.button} onPress={signUpHandler}>
          <Text style={styles.buttonText}>회원가입</Text>
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
    paddingTop: 20,
    gap: 15,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainGreen1,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
  },
});
