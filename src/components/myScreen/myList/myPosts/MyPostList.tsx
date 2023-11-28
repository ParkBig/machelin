import { StyleSheet, View } from 'react-native';
import NoPost from './NoPost';
import MyPostExist from './MyPostExist';
import { Colors } from 'const/global-styles';
import { useEffect } from 'react';
import useUsersPostsQuery from 'query/hooks/users/useUsersPostsQuery';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';

export default function MyPostList() {
  const { myInfo } = useMyInfoQuery();
  const { posts, rePosts } = useUsersPostsQuery(myInfo?.authUser?.id);

  useEffect(() => {
    rePosts();
  }, [myInfo, rePosts])

  return <View style={styles.wrap}>{posts?.posts?.length ? <MyPostExist /> : <NoPost />}</View>;
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: Colors.mainGreen1,
  },
});
