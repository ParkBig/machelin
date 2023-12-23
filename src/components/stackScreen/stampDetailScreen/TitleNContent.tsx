import { useRoute } from '@react-navigation/native';
import { Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { UseRouter } from 'types/screenType';

export default function TitleNContent() {
  const { params } = useRoute<UseRouter<'StampDetailScreen'>>();

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{params.stamp.title}</Text>
      {params.stamp.content && <Text>{params.stamp.content}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingVertical: 30,
    gap: 20,
  },
  title: {
    fontSize: Size.bigSuper,
    fontWeight: 'bold',
  },
});
