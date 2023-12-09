import { useIsFocused } from '@react-navigation/native';
import AreaPicker from 'components/bottomTabScreen/regionalSearchScreen/areaPicker/AreaPicker';
import Results from 'components/bottomTabScreen/regionalSearchScreen/results/Results';
import SearchBar from 'components/bottomTabScreen/regionalSearchScreen/searchBar/SearchBar';
import { Colors } from 'const/global-styles';
import { useEffect } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { useResetRecoilState } from 'recoil';
import { focusedRestaurantState } from 'store/locationState';

export default function RegionalSearchScreen() {
  const thisScreenIsFocused = useIsFocused();
  const resetFocusedRestaurant = useResetRecoilState(focusedRestaurantState);

  useEffect(() => {
    if (thisScreenIsFocused) {
      resetFocusedRestaurant();
    }
  }, [thisScreenIsFocused]);

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
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.mainWhite1,
  },
});
