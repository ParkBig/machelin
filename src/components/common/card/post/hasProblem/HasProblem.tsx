import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { IPost } from 'types/types';

interface Props {
  posts: IPost;
}

export default function HasProblem({ posts }: Props) {
  if (!posts.hasProblem) {
    return null;
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>신고를 많이 받은 게시글 입니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.googleBackground,
    fontSize: Size.normalBig,
  },
});
