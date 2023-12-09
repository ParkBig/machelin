import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { Colors, Size } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { modifyUserPreferFoodQuery } from 'query/user';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useMutation } from 'react-query';

export default function MakePreferFood() {
  const [makePreferFoodValue, setMakePreferFoodValue] = useState('');
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });
  const { myInfo, reMyInfo } = useMyInfoQuery();
  const { mutate } = useMutation(modifyUserPreferFoodQuery, {
    onSuccess: res => {
      if (res.ok) {
        setMakePreferFoodValue('');
        reMyInfo();
      } else {
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
    onError: () => {
      setToggleAlertModal({ toggle: true, alertMsg: '서버가 잠시 아픈거 같아요...' });
    },
  });

  const onChangeTextHandler = (text: string) => {
    setMakePreferFoodValue(text);
  };

  const onSubmitEditingHandler = () => {
    if (makePreferFoodValue.length === 0) {
      setToggleAlertModal({ toggle: true, alertMsg: '내용을 입력해주세요.' });
      return;
    }

    if (myInfo?.authUser.preferFoods.includes(makePreferFoodValue)) {
      setToggleAlertModal({ toggle: true, alertMsg: '이미 같은 내용이 있습니다.' });
      return;
    }

    mutate({ type: 'add', changePreferFood: makePreferFoodValue });
  };

  return (
    <>
      <View style={styles.wrap}>
        <TextInput
          style={styles.textInput}
          onSubmitEditing={onSubmitEditingHandler}
          onChangeText={onChangeTextHandler}
          value={makePreferFoodValue}
          placeholder="선호음식을 추가해볼까요?"
        />
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
    paddingVertical: 5,
    borderBottomWidth: 2,
    marginBottom: 15,
    borderBottomColor: Colors.mainGreen2,
  },
  textInput: {
    height: 50,
    fontSize: Size.bigSmall,
  },
});
