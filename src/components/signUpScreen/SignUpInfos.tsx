import Button from 'components/common/Button';
import { Colors } from 'const/global-styles';
import { signUpQuery } from 'query/user';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useMutation } from 'react-query';

interface Infos {
  email: string;
  password: string;
  nickName: string;
}

export default function SignUpInfos() {
  const [infos, setInfos] = useState<Infos>({ email: '', password: '', nickName: '' });
  const { mutate } = useMutation(signUpQuery);

  const setInfosHandler = (which: 'email' | 'password' | 'nickName', text: string) => {
    setInfos(prev => ({ ...prev, [which]: text }));
  };

  const signUpHandler = () => {
    const { email, password, nickName } = infos;
    mutate({ email, password, nickName });
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
      <TextInput
        style={styles.input}
        autoCorrect={false}
        placeholder="닉네임"
        onChangeText={setInfosHandler.bind(null, 'nickName')}
        value={infos.nickName}
      />
      <Button style={styles.button} onPress={signUpHandler}>
        <Text style={styles.buttonText}>회원가입</Text>
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
  },
});
