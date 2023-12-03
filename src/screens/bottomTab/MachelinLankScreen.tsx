import AreaPicker from 'components/machelinLankScreen/areaPicker/AreaPicker';
import Results from 'components/machelinLankScreen/results/Results';
import SearchBar from 'components/machelinLankScreen/searchBar/SearchBar';
import { Colors } from 'const/global-styles';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

export default function MachelinLankScreen() {
  return (
    <SafeAreaView style={styles.wrap}>
      <SearchBar />
      <AreaPicker />
      <Results />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: Colors.mainWhite1,
  },
});
