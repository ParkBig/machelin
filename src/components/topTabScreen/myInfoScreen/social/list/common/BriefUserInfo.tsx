import Button from 'components/common/layout/Button';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors, Size } from 'const/global-styles';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screenType';
import { UserInfo } from 'types/types';
import ToggleFollow from 'components/stackScreen/ExploreUserInfoScreen/exploreUserHeaderRight/ToggleFollow';

interface Props {
  userInfo: UserInfo;
}

export default function BriefUserInfo({ userInfo }: Props) {
  const navigation = useNavigation<UseNavigation<'MyInfoScreen' | 'ExploreUserInfoScreen'>>();

  const exploreUserInfoHandler = () => {
    //@ts-ignore
    navigation.push('ExploreUserInfoScreen', { userId: +userInfo.id });
  };

  const imageSource = userInfo.pfp ? { uri: userInfo.pfp } : require('assets/png/user.png');

  return (
    <View style={styles.wrap}>
      <View style={styles.imageWrap}>
        <Image style={styles.image} source={imageSource} />
      </View>
      <Button style={styles.info} onPress={exploreUserInfoHandler}>
        <View style={styles.nameLoginId}>
          <View>
            <Text style={styles.nicknameText}>{userInfo.nickname} </Text>
          </View>
          <View>
            <Text style={styles.loginIdText}>{userInfo.loginId}</Text>
          </View>
        </View>
      </Button>
      <ToggleFollow exploreUserId={userInfo.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minHeight: 60,
    paddingVertical: 10,
    width: '100%',
    flexDirection: 'row',
  },
  imageWrap: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  nameLoginId: {
    flex: 1,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  nicknameText: {
    fontSize: Size.normalMiddle,
  },
  loginIdText: {
    color: Colors.darkGray,
  },
});
