import { Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  contents: string;
}

export default function BriefContents({ contents }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.contentsText}>{contents}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 20,
  },
  contentsText: {
    fontSize: Size.normalMiddle,
  },
});
