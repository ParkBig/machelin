import Button from 'components/common/Button';
import { Colors } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  hashtags: string[];
}

export default function HashTags({ hashtags }: Props) {
  if (hashtags.length === 0) {
    return null;
  }

  return (
    <View style={styles.wrap}>
      {hashtags.map((hashtag, i) => (
        <Button key={hashtag + i}>
          <Text style={styles.text}>
            #{hashtag}
          </Text>
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
    paddingVertical: 15,
    gap: 5,
  },
  text: {
    color: Colors.darkGray,
  },
});
