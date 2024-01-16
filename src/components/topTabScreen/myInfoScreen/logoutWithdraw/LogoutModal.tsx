import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import Line from 'components/common/layout/Line';
import { Colors, Shadow } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
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
  const { reMyInfo } = useMyInfoQuery();

  const logoutHandler = async () => {
    await deleteToken();
    reMyInfo();
    navigate('MyScreen');
  };

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
          <Line style={styles.line} />
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
    marginBottom: 15,
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  wrap: {
    width: '100%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: Colors.mainGreen1,
    borderWidth: 2,
    ...Shadow,
    backgroundColor: Colors.mainWhite1,
  },
  title: {
    width: '100%',
    alignItems: 'flex-start',
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
  line: {
    height: '50%',
    width: 3,
    backgroundColor: Colors.mainGreen1,
  },
  text: {
    fontWeight: 'bold',
  },
});
