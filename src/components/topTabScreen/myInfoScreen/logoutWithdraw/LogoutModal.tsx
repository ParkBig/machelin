import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import { Colors, Shadow } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { UseNavigation } from 'types/screenType';
import { deleteToken } from 'util/tokenDB';

interface Props {
  toggleLogoutModal: boolean;
  setToggleLogoutModal: () => void;
}

export default function LogoutModal({ toggleLogoutModal, setToggleLogoutModal }: Props) {
  const { navigate } = useNavigation<UseNavigation<'MyInfoScreen'>>();
  const { myInfo, reMyInfo } = useMyInfoQuery();

  const logoutHandler = async () => {
    await deleteToken();
    reMyInfo();
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
      isVisible={toggleLogoutModal}
      onSwipeComplete={setToggleLogoutModal}
      onBackdropPress={setToggleLogoutModal}
      onBackButtonPress={setToggleLogoutModal}
      swipeDirection={['down']}
      useNativeDriverForBackdrop
    >
      <View style={styles.wrap}>
        <View style={styles.title}>
          <Text style={styles.text}>마슐랭</Text>
          <Text>로그아웃 하시겠습니까?</Text>
        </View>
        <View style={styles.buttons}>
          <Button style={styles.button} onPress={setToggleLogoutModal}>
            <Text style={styles.text}>아니요</Text>
          </Button>
          <Button style={styles.button} onPress={logoutHandler}>
            <Text style={styles.text}>예</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    marginBottom: 100,
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
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
});
