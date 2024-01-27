import { LayoutAnimation, StyleSheet } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { mainScreenTogglesState } from 'store/toggleState';
import { Colors } from 'const/global-styles';
import Button from 'components/common/layout/Button';
import useNearbyRestaurantsSearchQuery from 'query/hooks/restaurants/useNearbyRestaurantsSearchQuery';
import BriefRestaurantInfo from 'components/common/card/BriefRestaurantInfo';

export default function RepresentationRestaurantInfo() {
  const { restaurants } = useNearbyRestaurantsSearchQuery();
  const setMainScreenToggles = useSetRecoilState(mainScreenTogglesState);

  const openRestaurantListHandler = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMainScreenToggles(prev => ({ ...prev, toggleRestaurantList: true }));
  };

  return (
    <>
      {restaurants && restaurants.pages.length !== 0 && (
        <Button onPress={openRestaurantListHandler} style={styles.button}>
          <BriefRestaurantInfo restaurant={restaurants.pages[0]} isList={false} fnc={openRestaurantListHandler} />
        </Button>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: Colors.mainWhite1,
    opacity: 0.75,
  },
});
