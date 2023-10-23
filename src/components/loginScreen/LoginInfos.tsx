import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/Button';
import { Colors } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/useMyInfoQuery';
import { loginQuery } from 'query/user';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useMutation } from 'react-query';
import { UseNavigation } from 'types/screen/screenType';
import { storeToken } from 'util/tokenDB';

interface Infos {
  email: string;
  password: string;
}


export default function LoginInfos() {
  const { navigate } = useNavigation<UseNavigation<'LoginScreen'>>();
  const [infos, setInfos] = useState<Infos>({ email: '', password: '' });
  const { reMyInfo } = useMyInfoQuery();
  const { mutate } = useMutation(loginQuery, {
    onSuccess: async (res) => {
      await storeToken(res.data.token);
      reMyInfo();
      navigate('MyListScreen');
    },
    onError: (error) => console.log(error),
  });

  const setInfosHandler = (which: 'email' | 'password', text: string) => {
    setInfos(prev => ({ ...prev, [which]: text }));
  };

  const loginHandler = () => {
    const { email, password } = infos;
    mutate({ email, password });
  };
  
  return (
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
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
  }
});