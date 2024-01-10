import { Colors } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { getCreatedDate } from 'util/dateTranslator';

interface Props {
  createdAt: Date;
}

export default function CreatedAt({ createdAt }: Props) {
  const createdDate = getCreatedDate(createdAt);

  return (
    <View>
      <Text style={styles.dateText}>{createdDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dateText: {
    color: Colors.gray,
  },
});
