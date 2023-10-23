import { View, StyleSheet, BackHandler, LayoutAnimation } from 'react-native';
import { useEffect } from 'react';
import Header from 'components/mainScreen/header/Header';
import RestaurantList from 'components/mainScreen/restaurantInfo/RestaurantList';
import Map from 'components/mainScreen/map/Map';
import { useRecoilState } from 'recoil';
import { toggleHeaderOptionState, toggleRestaurantsListState, toggleSearchState } from 'store/toggleState';

export default function MainScreen() {
  const [toggleSearch, setToggleSearch] = useRecoilState(toggleSearchState);
  const [toggleHeaderOption, setToggleHeaderOption] = useRecoilState(toggleHeaderOptionState);
  const [toggleRestaurantList, setToggleRestaurantList] = useRecoilState(toggleRestaurantsListState);

  useEffect(() => {
    const backButtonHandler = () => {
      if (toggleSearch || toggleHeaderOption || toggleRestaurantList) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setToggleSearch(false);
        setToggleHeaderOption(false);
        setToggleRestaurantList(false);
        return true;
      }
      // 앱종료하쉴? 안내문 뛰우자
    };

    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, [toggleRestaurantList, setToggleRestaurantList]);

  return (
    <View style={styles.wrap}>
      <Header />
      <Map />
      <RestaurantList />
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
