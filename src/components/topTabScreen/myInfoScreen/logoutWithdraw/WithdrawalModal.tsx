import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { Colors, Shadow } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { useMutation } from 'react-query';
import { UseNavigation } from 'types/screenType';
import { deleteToken } from 'util/tokenDB';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import { withdrawalQuery } from 'query/api/user';

interface Props {
  toggleWithdrawalModal: boolean;
  setToggleWithdrawalModal: () => void;
}

export default function WithdrawalModal({ toggleWithdrawalModal, setToggleWithdrawalModal }: Props) {
  const { navigate } = useNavigation<UseNavigation<'MyInfoScreen'>>();
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });
  const { myInfo, reMyInfo } = useMyInfoQuery();

  const { mutate, isLoading } = useMutation(withdrawalQuery, {
    onSuccess: async res => {
      if (res.ok) {
        await deleteToken();
        reMyInfo();
      } else {
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
    onError: () => {
      setToggleAlertModal({ toggle: true, alertMsg: '서버가 잠시 아픈거 같아요...' });
    },
  });

  const withdrawHandler = () => {
    mutate();
  };

  useEffect(() => {
    if (!myInfo?.authUser) {
      navigate('MyScreen');
    }
  }, [myInfo]);

  return (
    <Modal
      style={styles.modal}
      backdropColor="transparent"
      isVisible={toggleWithdrawalModal}
      onSwipeComplete={setToggleWithdrawalModal}
      onBackdropPress={setToggleWithdrawalModal}
      onBackButtonPress={setToggleWithdrawalModal}
      swipeDirection={['down']}
      useNativeDriverForBackdrop
    >
      <View style={styles.wrap}>
        <View style={styles.title}>
          <Text style={styles.text}>마슐랭</Text>
          <Text>"예"를 누르시면 즉시 회원 탈퇴되요</Text>
          <Text>정말 회원탈퇴 하시겠습니까?</Text>
        </View>
        <View style={styles.buttons}>
          <Button style={styles.button} onPress={setToggleWithdrawalModal}>
            <Text style={styles.text}>아니요</Text>
          </Button>
          <Button style={styles.button} onPress={withdrawHandler}>
            <Text style={styles.text}>예</Text>
          </Button>
        </View>
      </View>
      {isLoading && <LoadingOverlay style={styles.loadingOverlay} />}
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    width: '90%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    ...Shadow,
    backgroundColor: Colors.mainWhite1,
  },
  title: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
  loadingOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
