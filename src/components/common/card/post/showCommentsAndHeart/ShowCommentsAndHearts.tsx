import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import CommentsModal from './CommentsModal';
import { IPost } from 'types/types';
import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/layout/Button';
import Hearts from './Hearts';
import { Colors, Size } from 'const/global-styles';

interface Props {
  posts: IPost;
}

export default function ShowCommentsAndHearts({ posts }: Props) {
  const [toggleComments, setToggleComments] = useState(false);

  const toggleCommentsHandler = () => {
    setToggleComments(prev => !prev);
  };

  return (
    <View style={styles.upperButton}>
      <Button style={styles.button} onPress={toggleCommentsHandler}>
        <Ionicons name="chatbox-ellipses-outline" size={Size.bigBig} color={Colors.gray} />
        <Text style={styles.text}>댓글보기</Text>
        {posts.comments.length !== 0 && <Text style={styles.text}>{posts.comments.length}</Text>}
      </Button>
      <Hearts postId={posts.id} postsLikes={posts.likes} />
      <CommentsModal postId={posts.id} toggleModal={toggleComments} toggleModalHandler={toggleCommentsHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  upperButton: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  button: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  text: {
    color: Colors.gray,
  },
});
