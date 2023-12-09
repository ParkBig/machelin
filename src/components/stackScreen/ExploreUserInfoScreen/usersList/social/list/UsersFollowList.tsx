import { useRoute } from '@react-navigation/native';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import BriefUserInfo from 'components/bottomTabScreen/myScreen/myList/social/list/BriefUserInfo';
import NoSocial from 'components/bottomTabScreen/myScreen/myList/social/list/NoSocial';
import useExploreUsersFollowsQuery from 'query/hooks/exploreUsers/useExploreUsersFollowsQuery';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { UseRouter } from 'types/screen/screenType';

export default function UsersFollowList() {
  const { params } = useRoute<UseRouter<'ExploreUserInfoScreen'>>();
  const { follows, followsIsLoading } = useExploreUsersFollowsQuery(params.userId);
  const followsExist = follows?.follows && follows.follows.length !== 0 ? true : false;

  return (
    <View>
      {followsIsLoading ? (
        <LoadingOverlay style={styles.loadingOverlay} />
      ) : followsExist ? (
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 5 }}
          data={follows?.follows}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => <BriefUserInfo key={item.id} userInfo={item} />}
        />
      ) : (
        <NoSocial type="follow" />
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
});
