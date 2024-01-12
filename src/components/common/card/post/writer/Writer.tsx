import { StyleSheet, Text, View } from 'react-native';
import Info from './Info';
import { IPost } from 'types/types';
import { Size } from 'const/global-styles';
import Options from './options/Options';

interface Props {
  posts: IPost;
}

export default function Writer({ posts }: Props) {
  const postType =
    posts.postType === 'allNotice' || posts.postType === 'localNotice'
      ? 'notice'
      : posts.postType === 'allAd' || posts.postType === 'localAd'
      ? 'ad'
      : 'post';

  return (
    <View style={styles.wrap}>
      {postType === 'notice' ? (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>전체 공지</Text>
        </View>
      ) : (
        <>
          <Info pfp={posts.owner.pfp} nickname={posts.owner.nickname} userInfoId={posts.owner.id} />
          {postType === 'post' && <Options postId={posts.id} ownerId={posts.owner.id} isPublic={posts.isPublic} />}
        </>
      )}
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
  notice: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noticeText: {
    fontSize: Size.bigSmall,
    fontWeight: 'bold',
  },
});
