import { Colors } from 'const/global-styles';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

interface Props {
  rating: number;
}

export default function RestaurantGrade({ rating }: Props) {
  return (
    <View style={styles.grades}>
      <View style={styles.grade}>
        <Text>Google</Text>
        <Text>{rating} /5</Text>
      </View>
      <View style={styles.grade}>
        <Text>kakao</Text>
      </View>
      <View style={styles.grade}>
        <Text>naver</Text>
      </View>
      <View style={styles.grade}>
        <Text>machelin</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grades: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 2,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  grade: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
