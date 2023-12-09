import { LayoutAnimation, StyleSheet, View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { mapLocationState } from 'store/locationState';
import { mainScreenTogglesState } from 'store/toggleState';
import { Colors } from 'const/global-styles';
import Button from 'components/common/layout/Button';
import useNearbyRestaurantsSearchQuery from 'query/hooks/restaurants/useNearbyRestaurantsSearchQuery';
import BriefRestaurantInfo from 'components/common/card/BriefRestaurantInfo';

export default function RepresentationRestaurantInfo() {
  const { restaurants } = useNearbyRestaurantsSearchQuery();
  const setMapLocation = useSetRecoilState(mapLocationState);
  const setMainScreenToggles = useSetRecoilState(mainScreenTogglesState);

  const openRestaurantListHandler = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMapLocation(prev => ({
      ...prev,
      latitude: prev.latitude - 0.0045,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }));
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
