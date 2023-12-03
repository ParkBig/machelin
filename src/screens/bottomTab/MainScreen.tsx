import { View, StyleSheet, BackHandler, LayoutAnimation } from 'react-native';
import { useEffect } from 'react';
import Header from 'components/mainScreen/header/Header';
import Map from 'components/mainScreen/map/Map';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { mainScreenTogglesState } from 'store/toggleState';
import { useIsFocused } from '@react-navigation/native';
import ToggleOptions from 'components/mainScreen/toggleOptions/ToggleOptions';
import Restaurants from 'components/mainScreen/restaurants/Restaurants';

export default function MainScreen() {
  const thisScreenIsFocused = useIsFocused();
  const resetMainScreenToggles = useResetRecoilState(mainScreenTogglesState);
  const { toggleOptions, toggleRestaurantList, toggleRestaurantSearch } = useRecoilValue(mainScreenTogglesState);

  useEffect(() => {
    const backButtonHandler = () => {
      if (toggleRestaurantSearch || toggleOptions || toggleRestaurantList) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        resetMainScreenToggles();
        return true;
      }
    };

    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, [toggleOptions, toggleRestaurantList, toggleRestaurantSearch, resetMainScreenToggles]);

  useEffect(() => {
    if (thisScreenIsFocused) {
      resetMainScreenToggles();
    }
  }, [thisScreenIsFocused]);

  return (
    <View style={styles.wrap}>
      <Header />
      <ToggleOptions />
      <Map />
      <Restaurants />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
