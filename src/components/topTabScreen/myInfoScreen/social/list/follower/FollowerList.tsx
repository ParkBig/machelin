import useUsersFollowersQuery from 'query/hooks/users/useUsersFollowersQuery';
import { FlatList, StyleSheet, View } from 'react-native';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import BriefUserInfo from '../common/BriefUserInfo';
import NoSocial from '../common/NoSocial';
import { ScreenHeight } from 'const/dimenstions';

export default function FollowerList() {
  const { followers, followersIsLoading, isReFollowers } = useUsersFollowersQuery();
  const followersExist = followers?.followers && followers.followers.length !== 0 ? true : false;

  return (
    <View style={styles.wrap}>
      {followersExist ? (
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 5 }}
          data={followers?.followers}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => <BriefUserInfo key={item.id} userInfo={item.follower} />}
        />
      ) : (
        <NoSocial type="follower" />
      )}
      {(followersIsLoading || isReFollowers) && <LoadingOverlay style={styles.loadingOverlay} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    minHeight: 300,
    maxHeight: ScreenHeight,
  },
  loadingOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
