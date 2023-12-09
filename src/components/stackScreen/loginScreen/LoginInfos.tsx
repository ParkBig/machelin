import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import { Colors } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { loginQuery } from 'query/user';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useMutation } from 'react-query';
import { UseNavigation } from 'types/screen/screenType';
import { storeToken, takeToken } from 'util/tokenDB';

interface Infos {
  email: string;
  password: string;
}

export default function LoginInfos() {
  const { navigate } = useNavigation<UseNavigation<'LoginScreen'>>();
  const [isLoading, setIsLoading] = useState(false);
  const [infos, setInfos] = useState<Infos>({ email: '', password: '' });
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });
  const { reMyInfo, myInfo } = useMyInfoQuery();

  const { mutate } = useMutation(loginQuery, {
    onSuccess: async res => {
      if (res.ok) {
        const t = await storeToken(res.token);
        reMyInfo();
      } else {
        setIsLoading(false);
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
    onError: () => {
      setToggleAlertModal({ toggle: true, alertMsg: '서버가 잠시 아픈거 같아요...' });
    },
  });

  const setInfosHandler = (which: 'email' | 'password', text: string) => {
    setInfos(prev => ({ ...prev, [which]: text }));
  };

  const loginHandler = () => {
    const { email, password } = infos;
    mutate({ email, password });
    setIsLoading(true);
  };

  useEffect(() => {
    if (myInfo?.authUser) {
      navigate('MyScreen');
    }
  }, [myInfo]);

  return (
    <>
      <View style={styles.wrap}>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="이메일"
          onChangeText={setInfosHandler.bind(null, 'email')}
          value={infos.email}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder="비밀번호"
          onChangeText={setInfosHandler.bind(null, 'password')}
          value={infos.password}
        />
        <Button style={styles.button} onPress={loginHandler}>
          <Text style={styles.buttonText}>로그인</Text>
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
    paddingHorizontal: 15,
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
    backgroundColor: Colors.lightGrayOpacity1,
    position: 'absolute',
    zIndex: 100,
  },
});
