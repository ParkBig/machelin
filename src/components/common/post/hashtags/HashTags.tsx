import Button from 'components/common/layout/Button';
import { Colors } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  hashtags: string[];
}

export default function HashTags({ hashtags }: Props) {
  if (hashtags.length === 0) {
    return null;
  }

  const onPressHandler = () => {
    // 내주변, 동네 게시글들스크린에서 이 키워드로 검색 이동
  }

  return (
    <View style={styles.wrap}>
      {hashtags.map((hashtag, i) => (
        <Button key={hashtag + i} onPress={onPressHandler}>
          <Text style={styles.text}>#{hashtag}</Text>
        </Button>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  text: {
    color: Colors.gray,
    textDecorationLine: 'underline',
  },
});
