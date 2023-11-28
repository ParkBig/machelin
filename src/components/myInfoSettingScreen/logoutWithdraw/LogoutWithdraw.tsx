import Button from 'components/common/Button';
import Line from 'components/common/Line';
import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import LogoutModal from './LogoutModal';
import { useState } from 'react';
import WithdrawalModal from './WithdrawalModal';

export default function LogoutWithdraw() {
  const [toggleModals, setToggleModals] = useState({ logout: false, withdrawal: false });

  const toggleModalHandler = (type: 'logout' | 'withdrawal') => {
    setToggleModals(prev => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <View style={styles.wrap}>
      <Button onPress={toggleModalHandler.bind(null, 'logout')}>
        <Text style={styles.text}>로그아웃</Text>
      </Button>
      <Line style={styles.line} />
      <Button onPress={toggleModalHandler.bind(null, 'withdrawal')}>
        <Text style={styles.text}>회원탈퇴</Text>
      </Button>
      <LogoutModal
        toggleLogoutModal={toggleModals['logout']}
        setToggleLogoutModal={toggleModalHandler.bind(null, 'logout')}
      />
      <WithdrawalModal
        toggleWithdrawalModal={toggleModals['withdrawal']}
        setToggleWithdrawalModal={toggleModalHandler.bind(null, 'withdrawal')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 10,
  },
  line: {
    height: '100%',
    width: 2,
    backgroundColor: Colors.mainGreen2,
  },
  text: {
    fontSize: Size.normalSmall,
  },
});
