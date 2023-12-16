import { StyleSheet, View } from 'react-native';
import NoSocial from './NoSocial';
import BriefUserInfo from './BriefUserInfo';
import useUsersFollowersQuery from 'query/hooks/users/useUsersFollowersQuery';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { FlatList } from 'react-native-gesture-handler';
import AvailableAfterLogin from 'components/common/modal/AvailableAfterLogin';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';

export default function FollowerList() {
  const { myInfo } = useMyInfoQuery();
  const { followers, followersIsLoading, isReFollowers } = useUsersFollowersQuery(myInfo?.authUser?.id);
  const followersExist = followers?.followers && followers.followers.length !== 0 ? true : false;

  return (
    <View>
      {myInfo?.authUser ? (
        followersExist ? (
          <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 5 }}
            data={followers?.followers}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => <BriefUserInfo key={item.id} userInfo={item} />}
          />
        ) : (
          <NoSocial type="follower" />
        )
      ) : (
        <AvailableAfterLogin />
      )}
      {(followersIsLoading || isReFollowers) && <LoadingOverlay style={styles.loadingOverlay} />}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    width: '100%',
    height: '100%',
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
  },
});
