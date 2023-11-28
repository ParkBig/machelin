import { StyleSheet, View } from 'react-native';
import Writer from './Writer';
import Report from './Report';
import { IPost } from 'types/store/myInfoType';
import LongContents from './LongContents';
import BriefContents from './BriefContents';

interface Props {
  posts: IPost;
}


export default function WriterNContent({ posts }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.writer}>
        <Writer pfp={posts.owner.pfp} nickname={posts.owner.nickname} />
        <Report postId={posts.id} />
      </View>
      {posts.contents.length > 50 ? (
        <LongContents contents={posts.contents} />
      ) : (
        <BriefContents contents={posts.contents} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 10,
    width: '100%',
  },
  writer: {
    height: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
