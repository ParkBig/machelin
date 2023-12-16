import Button from 'components/common/layout/Button';
import { Image, LayoutAnimation, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserInfo } from 'types/store/myInfoType';
import { Colors, Size } from 'const/global-styles';
import { useState } from 'react';
import Line from 'components/common/layout/Line';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screen/screenType';
import ToggleFollow from 'components/stackScreen/ExploreUserInfoScreen/exploreUsersInfo/ToggleFollow';

interface Props {
  userInfo: UserInfo;
}

export default function BriefUserInfo({ userInfo }: Props) {
  const navigation = useNavigation<UseNavigation<'MyScreen'>>();
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  const bookmarks = userInfo.bookmarks?.length;
  const posts = userInfo.posts?.length;
  const followers = userInfo.followers?.length;

  const toggleOpenInfoHandler = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpenInfo(prev => !prev);
  };

  const exploreUserInfoHandler = () => {
    //@ts-ignore
    navigation.push('ExploreUserInfoScreen', { userId: +userInfo.id });
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.basicInfo}>
        <View style={styles.imageWrap}>
          <Image style={styles.image} source={userInfo.pfp ? { uri: userInfo.pfp } : require('assets/png/user.png')} />
        </View>
        <View style={styles.info}>
          <View style={styles.nameEmail}>
            <View>
              <Text style={styles.nicknameText}>{userInfo.nickname} </Text>
            </View>
            <View>
              <Text style={styles.emailText}>{userInfo.email}</Text>
            </View>
          </View>
          <ToggleFollow exploreUserId={userInfo.id} />
        </View>
        <Button style={styles.button} onPress={toggleOpenInfoHandler}>
          <Ionicons name={isOpenInfo ? 'chevron-up' : 'chevron-down'} size={25} />
        </Button>
      </View>
      {isOpenInfo && (
        <View style={styles.moreInfos}>
          <View style={styles.upperMoreInfo}>
            <View style={styles.moreInfo}>
              <Ionicons name="bookmarks" size={25} color={Colors.mainGreen1} />
              <Text>{bookmarks}</Text>
            </View>
            <Line style={styles.line} />
            <View style={styles.moreInfo}>
              <Ionicons name="reader" size={25} color={Colors.mainGreen1} />
              <Text>{posts}</Text>
            </View>
            <Line style={styles.line} />
            <View style={styles.moreInfo}>
              <Ionicons name="people" size={25} color={Colors.mainGreen1} />
              <Text>{followers}</Text>
            </View>
            <Line style={styles.line} />
            <Button style={styles.button} onPress={exploreUserInfoHandler}>
              <Ionicons name="chevron-forward" size={25} color={Colors.mainGreen1} />
            </Button>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
  },
  basicInfo: {
    minHeight: 60,
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
  nameEmail: {
    flex: 1,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    width: 40,
    minHeight: 60,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nicknameText: {
    fontSize: Size.normalMiddle,
  },
  emailText: {
    color: Colors.darkGray,
  },
  rankText: {
    fontSize: Size.normalSmall,
  },
  moreInfos: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.mainGreen1,
  },
  upperMoreInfo: {
    flex: 1,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.mainGreen2,
  },
  moreInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  line: {
    height: '60%',
    width: 2,
    backgroundColor: Colors.mainGreen1,
  },
});
