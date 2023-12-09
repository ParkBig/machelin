import { View, StyleSheet, BackHandler, LayoutAnimation } from 'react-native';
import { useEffect } from 'react';
import Header from 'components/bottomTabScreen/mainScreen/header/Header';
import MainMap from 'components/bottomTabScreen/mainScreen/map/MainMap';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { mainScreenTogglesState } from 'store/toggleState';
import { useIsFocused } from '@react-navigation/native';
import Restaurants from 'components/bottomTabScreen/mainScreen/restaurants/Restaurants';
import { focusedRestaurantState } from 'store/locationState';

export default function MainScreen() {
  const thisScreenIsFocused = useIsFocused();
  const resetFocusedRestaurant = useResetRecoilState(focusedRestaurantState);
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
      resetFocusedRestaurant();
    }
  }, [thisScreenIsFocused]);

  return (
    <View style={styles.wrap}>
      <Header />
      {/* <ToggleOptions /> */}
      <MainMap />
      <Restaurants />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
