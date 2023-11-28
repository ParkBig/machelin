import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/Button';
import { Colors } from 'const/global-styles';
import { useMutation } from 'react-query';
import { modifyUserPreferFoodQuery } from 'query/user';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { useState } from 'react';
import ConfirmAlertModal, { ToggleState } from 'components/common/ConfirmAlertModal';

interface Props {
  preferFood: string;
}

export default function PreferFood({ preferFood }: Props) {
  const { reMyInfo } = useMyInfoQuery();
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });
  const { mutate } = useMutation(modifyUserPreferFoodQuery, {
    onSuccess: res => {
      if (res.ok) {
        reMyInfo();
      } else {
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
    onError: () => {
      setToggleAlertModal({ toggle: true, alertMsg: '서버가 잠시 아픈거 같아요...' });
    },
  });

  const deletePreferFoodHandler = () => {
    mutate({ type: 'delete', changePreferFood: preferFood });
  };

  return (
    <>
      <View style={styles.wrap}>
        <Text>{preferFood}</Text>
        <Button style={styles.button} onPress={deletePreferFoodHandler}>
          <Ionicons name="remove-circle" size={30} color={Colors.mainGreen2} />
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.mainGreen2,
    position: 'relative',
  },
  button: {
    position: 'absolute',
    top: -10,
    right: -5,
  },
});
