import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { Colors, Size, Shadow } from 'const/global-styles';
import { modifyUserPreferRestaurantQuery } from 'query/api/user';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useMutation } from 'react-query';
import { StackScreenPropsAbout } from 'types/screenType';

export default function ChangeMyPreferRestaurantScreen({
  navigation,
}: StackScreenPropsAbout<'ChangeMyPreferRestaurantScreen'>) {
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });
  const [preferRestaurantValue, setPreferRestaurantValue] = useState('');
  const { reMyInfo } = useMyInfoQuery();

  const { mutate } = useMutation(modifyUserPreferRestaurantQuery, {
    onSuccess: res => {
      if (res.ok) {
        reMyInfo();
        navigation.goBack();
      } else {
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
    onError: () => {
      setToggleAlertModal({ toggle: true, alertMsg: '서버가 잠시 아픈거 같아요...' });
    },
  });

  const textChangeHandler = (text: string) => {
    setPreferRestaurantValue(text);
  };

  const changePreferRestaurantHandler = () => {
    if (!preferRestaurantValue) {
      setToggleAlertModal({ toggle: true, alertMsg: '입력해주세요' });
      return;
    }

    mutate({ changePreferRestaurant: preferRestaurantValue });
  };

  return (
    <>
      <View style={styles.wrap}>
        <TextInput
          style={styles.textInput}
          placeholder="최애식당을 입력해보아요..."
          value={preferRestaurantValue}
          onChangeText={textChangeHandler}
        />
        <Button style={styles.button} onPress={changePreferRestaurantHandler}>
          <Text style={styles.text}>최애식당 변경</Text>
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
    color: Colors.mainWhite3,
    fontSize: Size.normalBig,
    fontWeight: 'bold',
  },
  errText: {
    color: 'tomato',
  },
});
