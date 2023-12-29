import { StyleSheet, Text, View } from 'react-native';
import Info from './Info';
import Report from './Report';
import { IPost } from 'types/types';
import { Colors } from 'const/global-styles';
import { getCreatedDate } from 'util/dateTranslator';

interface Props {
  posts: IPost;
}

export default function Writer({ posts }: Props) {
  const createdDate = getCreatedDate(posts.createdAt);

  return (
    <>
      <View style={styles.wrap}>
        <Info pfp={posts.owner.pfp} nickname={posts.owner.nickname} />
        <Report postId={posts.id} isPublic={posts.isPublic} />
      </View>
      <View>
        <Text style={styles.dateText}>{createdDate}</Text>
      </View>
    </>
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
  dateText: {
    color: Colors.gray,
  },
});
