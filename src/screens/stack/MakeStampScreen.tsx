import { Colors } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import TitleNContent from 'components/stackScreen/makeStampScreen/TitleNContent';
import RestaurantInfo from 'components/stackScreen/makeStampScreen/restaurantInfo/RestaurantInfo';

export default function MakeStampScreen() {
  return (
    <View style={styles.wrap}>
      <View style={styles.explain}>
        <Text style={styles.explainText}>도장 찍기는 현재 위치만 찍을 수 있어요.</Text>
        <Text style={styles.explainText}>그래서 직접 다녀왔다는 인증이 가능해요!</Text>
      </View>
      <TitleNContent />
      <RestaurantInfo />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.mainWhite1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  explain: {
    width: '100%',
    gap: 5,
  },
  explainText: {
    color: Colors.gray,
  },
});
