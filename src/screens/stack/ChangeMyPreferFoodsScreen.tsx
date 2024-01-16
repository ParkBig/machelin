import MakePreferFood from 'components/stackScreen/changeMyPreferFoodsScreen/MakePreferFood';
import PreferFoods from 'components/stackScreen/changeMyPreferFoodsScreen/PreferFoods';
import { Colors } from 'const/global-styles';
import { ScrollView, StyleSheet } from 'react-native';

export default function ChangeMyPreferFoodsScreen() {
  return (
    <ScrollView style={styles.wrap} showsVerticalScrollIndicator={false}>
      <MakePreferFood />
      <PreferFoods />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: Colors.mainWhite1,
  },
});
