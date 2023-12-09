import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { Colors, Shadow, Size } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { modifyUserNicknameQuery } from 'query/user';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useMutation } from 'react-query';
import { StackScreenPropsAbout } from 'types/screen/screenType';

export default function ChangeMyNicknameScreen({ navigation }: StackScreenPropsAbout<'ChangeMyNicknameScreen'>) {
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });
  const [nickname, setNickname] = useState('');
  const { reMyInfo } = useMyInfoQuery();
  const { mutate } = useMutation(modifyUserNicknameQuery, {
    onSuccess: res => {
      if (res.ok) {
        reMyInfo();
        navigation.navigate('MyInfoSettingScreen');
      } else {
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
    onError: () => {
      setToggleAlertModal({ toggle: true, alertMsg: '서버가 잠시 아픈거 같아요...' });
    },
  });

  const textChangeHandler = (text: string) => {
    setNickname(text);
  };

  const changeNicknameHandler = () => {
    if (!nickname) {
      setToggleAlertModal({ toggle: true, alertMsg: '입력해주세요' });
      return;
    }

    if (nickname.length > 20) {
      setToggleAlertModal({ toggle: true, alertMsg: '닉네임은 20자 이내입니다' });
      return;
    }

    mutate({ changeNickname: nickname });
  };

  return (
    <>
      <View style={styles.wrap}>
        <TextInput
          style={styles.textInput}
          placeholder="닉네임 입력(20자 이내)"
          value={nickname}
          onChangeText={textChangeHandler}
        />
        <Button style={styles.button} onPress={changeNicknameHandler}>
          <Text style={styles.text}>닉네임 변경</Text>
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
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: Colors.mainWhite1,
    gap: 15,
  },
  textInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: Colors.lightGray,
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.mainGreen1,
    ...Shadow,
  },
  text: {
    color: Colors.mainBlue1,
    fontSize: Size.normalBig,
    fontWeight: 'bold',
  },
  errText: {
    color: 'tomato',
  },
});
