import { useRoute } from '@react-navigation/native';
import { Colors } from 'const/global-styles';
import useExploreUserQuery from 'query/hooks/exploreUsers/useExploreUserQuery';
import { Image, StyleSheet, Text, View } from 'react-native';
import { UseRouter } from 'types/screenType';

export default function BriefExploreUsersInfo() {
  const { params } = useRoute<UseRouter<'ExploreUserInfoScreen'>>();
  const { exploreUser } = useExploreUserQuery(params.userId);

  return (
    <View style={styles.wrap}>
      <View style={styles.php}>
        <Image
          style={styles.image}
          source={
            exploreUser?.exploreUser?.pfp ? { uri: exploreUser?.exploreUser?.pfp } : require('assets/png/user.png')
          }
        />
      </View>
      <View style={styles.infos}>
        <View>
          <Text style={styles.nickname}>{exploreUser?.exploreUser.nickname}</Text>
        </View>
        <View>
          <Text style={styles.loginId}>{exploreUser?.exploreUser.loginId}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  infos: {
    flex: 1,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  nickname: {
    fontSize: 25,
  },
  loginId: {
    fontSize: 15,
    color: Colors.gray,
  },
});
