import MakePreferFood from 'components/changeMyPreferFoodsScreen/MakePreferFood';
import PreferFoods from 'components/changeMyPreferFoodsScreen/PreferFoods';
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
