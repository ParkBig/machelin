import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import { Size } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { Image, StyleSheet, Text, View } from 'react-native';
import { UseNavigation } from 'types/screenType';

interface Props {
  pfp: string;
  nickname: string;
  userInfoId: number;
}

export default function Info({ pfp, nickname, userInfoId }: Props) {
  const { myInfo } = useMyInfoQuery();
  const navigation =
    useNavigation<
      UseNavigation<'RestaurantDetailScreen' | 'NeighborhoodPostsScreen' | 'MyScreen' | 'ExploreUserInfoScreen'>
    >();

  const exploreUserInfoHandler = () => {
    if (myInfo?.authUser.id === userInfoId) {
      navigation.navigate('MyScreen');
    } else {
      //@ts-ignore
      navigation.push('ExploreUserInfoScreen', { userId: userInfoId });
    }
  };

  const imageSource = pfp ? { uri: pfp } : require('assets/png/user.png');

  return (
    <View style={styles.writerInfo}>
      <Button>
        <Image style={styles.writerImage} source={imageSource} />
      </Button>
      <Button style={styles.writer} onPress={exploreUserInfoHandler}>
        <Text style={styles.writerText}>{nickname}</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  writerInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  writerImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  writer: {
    flex: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  writerText: {
    fontSize: Size.normalBig,
  },
});
