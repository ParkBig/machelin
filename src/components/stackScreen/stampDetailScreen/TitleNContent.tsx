import { useRoute } from '@react-navigation/native';
import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { UseRouter } from 'types/screenType';
import { getCreatedDate } from 'util/dateTranslator';

export default function TitleNContent() {
  const { params } = useRoute<UseRouter<'StampDetailScreen'>>();

  const createdDate = getCreatedDate(params.stamp.createdAt);

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{params.stamp.title}</Text>
      <Text style={styles.date}>{createdDate}</Text>
      {params.stamp.content && <Text style={styles.content}>{params.stamp.content}</Text>}
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
  date: {
    color: Colors.gray,
    fontSize: Size.normalMiddle,
  },
  content: {
    paddingTop: 15,
    fontSize: Size.normalBig,
  },
});
