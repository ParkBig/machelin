import { StyleSheet, View } from 'react-native';
import Info from './Info';
import { IPost } from 'types/types';
import Options from './options/Options';
import Notice from './Notice';

interface Props {
  posts: IPost;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Writer({ posts, setIsVisible }: Props) {
  const postType =
    posts.postType === 'ALL_NOTICE'
      ? 'ALL_NOTICE'
      : posts.postType === 'LOCAL_NOTICE'
        ? 'LOCAL_NOTICE'
        : posts.postType === 'ALL_AD' || posts.postType === 'LOCAL_AD'
          ? 'LOCAL_AD'
          : 'POST';

  return (
    <View style={styles.wrap}>
      {postType === 'ALL_NOTICE' || postType === 'LOCAL_NOTICE' ? (
        <Notice postType={postType} ownerSubLocality={posts.ownerSubLocality} />
      ) : (
        <>
          {posts.owner && (
            <>
              <Info pfp={posts.owner.pfp} nickname={posts.owner.nickname} userInfoId={posts.owner.id} />
              {postType === 'POST' && (
                <Options
                  setIsVisible={setIsVisible}
                  postId={posts.id}
                  ownerId={posts.owner.id}
                  isPublic={posts.isPublic}
                />
              )}
            </>
          )}
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
