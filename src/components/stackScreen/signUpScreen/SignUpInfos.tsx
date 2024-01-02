import { useNavigation, useRoute } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import { Colors } from 'const/global-styles';
import { signUpQuery } from 'query/user';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useMutation } from 'react-query';
import { UseNavigation, UseRouter } from 'types/screenType';

interface Infos {
  loginId: string;
  password: string;
  passwordCheck: string;
  nickname: string;
}

export default function SignUpInfos() {
  const { navigate } = useNavigation<UseNavigation<'SignUpScreen'>>();
  const { params } = useRoute<UseRouter<'SignUpScreen'>>();
  const [infos, setInfos] = useState<Infos>({ loginId: '', password: '', passwordCheck: '', nickname: '' });
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });
  const { mutate, isLoading } = useMutation(signUpQuery, {
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

  const setInfosHandler = (which: 'loginId' | 'password' | 'nickname' | 'passwordCheck', text: string) => {
    setInfos(prev => ({ ...prev, [which]: text }));
  };

  const signUpHandler = () => {
    const mobile = params.mobile;
    const { loginId, password, passwordCheck, nickname } = infos;

    if (password !== passwordCheck) {
      setToggleAlertModal({ toggle: true, alertMsg: '비밀번호가 일치하지 않아요' });
      return;
    }
    if (nickname.length > 20) {
      setToggleAlertModal({ toggle: true, alertMsg: '닉네임은 최대 20자까지 가능합니다' });
      return;
    }

    mutate({ loginId, password, nickname, mobile });
  };

  return (
    <>
      <View style={styles.wrap}>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="default"
          placeholder="아이디 입력"
          onChangeText={setInfosHandler.bind(null, 'loginId')}
          value={infos.loginId}
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
      {isLoading && <LoadingOverlay style={styles.loadingOverlay} />}
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
  loadingOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
