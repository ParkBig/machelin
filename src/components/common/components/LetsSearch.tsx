import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LetsSearch() {
  return (
    <View style={styles.wrap}>
      <Ionicons name="restaurant" size={100} color={Colors.gray} />
      <View style={styles.content}>
        <Text style={styles.text}>작성자 닉네임, 게시글이 작성된 장소,</Text>
        <Text style={styles.text}>키워드를 검색할 수 있어요</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainWhite1,
    gap: 10,
  },
  content: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: Size.normalBig,
    color: Colors.gray,
  },
});
