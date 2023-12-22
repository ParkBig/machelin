import { StyleSheet, View } from 'react-native';
import Info from './Info';
import Report from './Report';
import { IPost } from 'types/types';

interface Props {
  posts: IPost;
}

export default function Writer({ posts }: Props) {
  return (
    <View style={styles.wrap}>
      <Info pfp={posts.owner.pfp} nickname={posts.owner.nickname} />
      <Report postId={posts.id} isPublic={posts.isPublic} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minHeight: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
