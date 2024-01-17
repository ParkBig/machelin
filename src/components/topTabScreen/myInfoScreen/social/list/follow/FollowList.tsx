import useUsersFollowsQuery from 'query/hooks/users/useUsersFollowsQuery';
import { FlatList, StyleSheet, View } from 'react-native';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import BriefUserInfo from '../common/BriefUserInfo';
import NoSocial from '../common/NoSocial';
import { ScreenHeight } from 'const/dimenstions';

export default function FollowList() {
  const { follows, followsIsLoading, isReFollows } = useUsersFollowsQuery();
  const followsExist = follows?.follows && follows.follows.length !== 0 ? true : false;

  return (
    <View style={styles.wrap}>
      {followsExist ? (
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
      {(followsIsLoading || isReFollows) && <LoadingOverlay style={styles.loadingOverlay} />}
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
