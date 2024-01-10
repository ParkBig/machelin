import { StyleSheet, Text, View } from 'react-native';
import Info from './Info';
import { IPost } from 'types/types';
import { Size } from 'const/global-styles';
import Options from './options/Options';

interface Props {
  posts: IPost;
}

export default function Writer({ posts }: Props) {
  const isNotice = posts.postType === 'notice' ? true : false;

  return (
    <View style={styles.wrap}>
      {isNotice ? (
        <View>
          <Text style={styles.noticeText}>전체 공지</Text>
        </View>
      ) : (
        <>
          <Info pfp={posts.owner.pfp} nickname={posts.owner.nickname} userInfoId={posts.owner.id} />
          <Options postId={posts.id} ownerId={posts.owner.id} isPublic={posts.isPublic} />
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
  noticeText: {
    fontSize: Size.bigSmall,
  },
});
