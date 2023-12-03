import { DEFAULT_IMAGE } from 'const/default';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from 'const/global-styles';
import getDateTrans from 'util/dateTranslator';
import Line from 'components/common/Line';
import usePostsCommentsQuery from 'query/hooks/posts/usePostsCommentsQuery';

interface Props {
  postId: number;
}

export default function Comments({ postId }: Props) {
  const { comments, commentsIsLoading, reComments } = usePostsCommentsQuery(postId);

  return (
    <>
      {comments && !commentsIsLoading && (
        <FlatList
          style={styles.FlatWrap}
          data={comments.comments}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => {
            const timeAgo = getDateTrans(item.createdAt);

            return (
              <View style={styles.wrap}>
                <View style={styles.imgWrap}>
                  <Image
                    style={styles.img}
                    source={item.owner.pfp ? { uri: item.owner.pfp } : require('assets/png/user.png')}
                  />
                </View>
                <View style={styles.userNameNComment}>
                  <View style={styles.userInfo}>
                    <Text style={styles.userNameText}>{item.owner.nickname}</Text>
                    <Line style={styles.dot} />
                    <Text style={styles.timeAgoText}>{timeAgo}</Text>
                  </View>
                  <View style={styles.commentWrap}>
                    <Text>{item.comment}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  FlatWrap: {
    flex: 1,
  },
  wrap: {
    width: '100%',
    minHeight: 40,
    flexDirection: 'row',
    paddingVertical: 8,
  },
  imgWrap: {
    width: 40,
    alignItems: 'center',
  },
  img: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNameNComment: {
    flex: 1,
    gap: 5,
  },
  userInfo: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dot: {
    height: 7,
    width: 7,
    backgroundColor: Colors.mainGreen1,
  },
  userNameText: {
    fontWeight: 'bold',
  },
  timeAgoText: {
    color: Colors.darkGray,
  },
  commentWrap: {
    width: '100%',
    justifyContent: 'center',
    paddingRight: 7.5,
  },
});
