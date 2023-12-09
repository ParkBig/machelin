import { useRoute } from '@react-navigation/native';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import BriefUserInfo from 'components/bottomTabScreen/myScreen/myList/social/list/BriefUserInfo';
import NoSocial from 'components/bottomTabScreen/myScreen/myList/social/list/NoSocial';
import useExploreUsersFollowersQuery from 'query/hooks/exploreUsers/useExploreUsersFollowersQuery';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { UseRouter } from 'types/screen/screenType';

export default function UsersFollowerList() {
  const { params } = useRoute<UseRouter<'ExploreUserInfoScreen'>>();
  const { followers, followersIsLoading } = useExploreUsersFollowersQuery(params.userId);
  const followersExist = followers?.followers && followers.followers.length !== 0 ? true : false;

  return (
    <View>
      {followersIsLoading ? (
        <LoadingOverlay style={styles.loadingOverlay} />
      ) : followersExist ? (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
