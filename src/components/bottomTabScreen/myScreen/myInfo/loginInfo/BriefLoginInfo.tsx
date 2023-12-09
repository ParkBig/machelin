import { Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/layout/Button';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screen/screenType';
import { Colors } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';

export default function BriefLoginInfo() {
  const { myInfo } = useMyInfoQuery();
  const { navigate } = useNavigation<UseNavigation<'MyScreen'>>();

  const goToMyInfoSettingHandler = () => {
    navigate('MyInfoSettingScreen');
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.php}>
        <Image
          style={styles.image}
          source={myInfo?.authUser?.pfp ? { uri: myInfo?.authUser?.pfp } : require('assets/png/user.png')}
        />
      </View>
      <View style={styles.infos}>
        <View>
          <Text style={styles.nickname}>{myInfo?.authUser?.nickname}</Text>
        </View>
        <View>
          <Text style={styles.email} ellipsizeMode="tail">
            {myInfo?.authUser?.email}
          </Text>
        </View>
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
    flexDirection: 'row',
    paddingVertical: 10,
    gap: 10,
  },
  php: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infos: {
    flex: 1,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  nickname: {
    fontSize: 25,
  },
  email: {
    fontSize: 15,
    color: Colors.gray,
  },
  changeInfo: {
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
