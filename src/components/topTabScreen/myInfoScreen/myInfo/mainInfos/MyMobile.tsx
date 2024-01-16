import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { StyleSheet, Text, View } from 'react-native';
import { UseNavigation } from 'types/screenType';
import { Ionicons } from '@expo/vector-icons';

export default function MyMobile() {
  const { navigate } = useNavigation<UseNavigation<'MyInfoScreen'>>();
  const { myInfo } = useMyInfoQuery();

  const navigateToChangeNicknameHandler = () => {
    navigate('TermsOfUseScreen');
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.titleText}>전화번호</Text>
      <Button style={styles.mobile} onPress={navigateToChangeNicknameHandler}>
        <Text>{myInfo?.authUser?.mobile ? myInfo?.authUser?.mobile : '미인증'}</Text>
        <Ionicons name="chevron-forward-outline" size={20} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 60,
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
  },
  mobile: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.7,
    gap: 5,
  },
});
