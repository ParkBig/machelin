import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/useMyInfoQuery';
import Button from 'components/common/Button';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screen/screenType';

export default function BriefLoginInfo() {
  const { myInfo } = useMyInfoQuery();
  const { navigate } = useNavigation<UseNavigation<'MyListScreen'>>();

  const goToMyInfoSettingHandler = () => {
    navigate('MyInfoSettingScreen');
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.upperPhp}>
        <View style={styles.php}>
          <Ionicons name="person-outline" size={30} color={Colors.mainWhite1} />
        </View>
      </View>
      <View style={styles.infos}>
        <Text style={styles.nickName}>{myInfo?.authUser?.nickName}</Text>
        <Text style={styles.email}>{myInfo?.authUser?.email}</Text>
      </View>
      <Button style={styles.changeInfo} onPress={goToMyInfoSettingHandler}>
        <Ionicons name="chevron-forward-outline" size={30} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
  },
  upperPhp: {
    width: 60,
    height: '100%',
    justifyContent: 'center',
  },
  php: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainGreen1,
  },
  infos: {
    flex: 1,
    justifyContent: 'center',
  },
  nickName: {
    fontSize: 30,
  },
  email: {
    fontSize: 15,
  },
  changeInfo: {
    width: 35,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
