import { StyleSheet, View } from 'react-native';
import Info from './Info';
import { IPost } from 'types/types';
import Options from './options/Options';
import Notice from './Notice';

interface Props {
  posts: IPost;
}

export default function Writer({ posts }: Props) {
  const postType =
    posts.postType === 'allNotice'
      ? 'allNotice'
      : posts.postType === 'localNotice'
      ? 'localNotice'
      : posts.postType === 'allAd' || posts.postType === 'localAd'
      ? 'ad'
      : 'post';

  return (
    <View style={styles.wrap}>
      {postType === 'allNotice' || postType === 'localNotice' ? (
        <Notice postType={postType} ownerSubLocality={posts.ownerSubLocality} />
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
});
