import { useRoute } from '@react-navigation/native';
import { Colors } from 'const/global-styles';
import { StyleSheet, View } from 'react-native';
import { UseRouter } from 'types/screen/screenType';
import UsersPostExist from './UsersPostExist';
import NoPost from 'components/myScreen/myList/myPosts/NoPost';
import useExploreUsersPostsQuery from 'query/hooks/exploreUsers/useExploreUsersPostsQuery';

export default function UsersPostList() {
  const { params } = useRoute<UseRouter<'ExploreUserInfoScreen'>>();
  const { posts } = useExploreUsersPostsQuery(params.userId);

  return <View style={styles.wrap}>{posts?.posts?.length ? <UsersPostExist /> : <NoPost />}</View>;
}

const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 2,
    paddingTop: 10,
    borderTopColor: Colors.mainGreen1,
  },
});
