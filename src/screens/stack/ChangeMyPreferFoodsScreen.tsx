import MakePreferFood from 'components/stackScreen/changeMyPreferFoodsScreen/MakePreferFood';
import PreferFoods from 'components/stackScreen/changeMyPreferFoodsScreen/PreferFoods';
import { ScrollView, StyleSheet } from 'react-native';

export default function ChangeMyPreferFoodsScreen() {
  return (
    <ScrollView style={styles.wrap}>
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
  }
})
