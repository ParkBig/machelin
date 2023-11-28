import AreaPicker from 'components/machelinLankScreen/areaPicker/AreaPicker';
import Results from 'components/machelinLankScreen/results/Results';
import SearchBar from 'components/machelinLankScreen/searchBar/SearchBar';
import { Colors } from 'const/global-styles';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

export default function MachelinLankScreen() {
  // const { restaurants } = useGetRestaurants(37.4979, 127.0276, '4000');

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
