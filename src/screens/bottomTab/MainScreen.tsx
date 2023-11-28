import { View, StyleSheet, BackHandler, LayoutAnimation } from 'react-native';
import { useEffect } from 'react';
import Header from 'components/mainScreen/header/Header';
import Map from 'components/mainScreen/map/Map';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { mainScreenTogglesState } from 'store/toggleState';
import { useIsFocused } from '@react-navigation/native';
import ToggleOptions from 'components/mainScreen/toggleOptions/ToggleOptions';
import Restaurants from 'components/mainScreen/restaurants/Restaurants';

export default function MainScreen() {
  const thisScreenIsFocused = useIsFocused();
  const [{ toggleOptions, toggleRestaurantList, toggleRestaurantSearch }, setMainScreenToggles] =
    useRecoilState(mainScreenTogglesState);
  const resetMainScreenToggles = useResetRecoilState(mainScreenTogglesState);

  useEffect(() => {
    const backButtonHandler = () => {
      if (toggleRestaurantSearch || toggleOptions || toggleRestaurantList) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        resetMainScreenToggles();
        return true;
      }
      // 앱종료하쉴? 안내문 뛰우자
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
