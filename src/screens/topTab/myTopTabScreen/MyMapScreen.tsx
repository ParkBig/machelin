import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import List from 'components/topTabScreen/myMapScreen/list/List';
import MyMap from 'components/topTabScreen/myMapScreen/myMap/MyMap';
import { Colors } from 'const/global-styles';
import useUsersPostForMyMapQuery from 'query/hooks/posts/useUsersPostForMyMapQuery';
import useUsersBookmarksQuery from 'query/hooks/users/useUsersBookmarksQuery';
import { StyleSheet, View } from 'react-native';

export default function MyMapScreen() {
  const { postsIsLoading } = useUsersPostForMyMapQuery();
  const { bookmarksIsLoading } = useUsersBookmarksQuery();

  return (
    <View style={styles.wrap}>
      <MyMap />
      <List />
      {(postsIsLoading || bookmarksIsLoading) && <LoadingOverlay style={styles.loadingOverlay} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGrayOpacity1,
    position: 'absolute',
    zIndex: 100,
  },
});
