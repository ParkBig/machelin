import { useRoute } from '@react-navigation/native';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import BriefUserInfo from 'components/topTabScreen/myInfoScreen/social/list/common/BriefUserInfo';
import NoSocial from 'components/topTabScreen/myInfoScreen/social/list/common/NoSocial';
import useExploreUsersFollowersQuery from 'query/hooks/exploreUsers/useExploreUsersFollowersQuery';
import { FlatList, StyleSheet, View } from 'react-native';
import { UseRouter } from 'types/screenType';

export default function UsersFollowerList() {
  const { params } = useRoute<UseRouter<'ExploreUserInfoScreen'>>();
  const { followers, followersIsLoading, isReFollowers } = useExploreUsersFollowersQuery(params.userId);
  const followersExist = followers?.followers && followers.followers.length !== 0 ? true : false;

  return (
    <View>
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
  loadingOverlay: {
    width: '100%',
    height: '100%',
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
  },
})
