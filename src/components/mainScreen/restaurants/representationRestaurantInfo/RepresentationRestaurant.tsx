import { LayoutAnimation, StyleSheet, View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { mapLocationState } from 'store/locationState';
import { mainScreenTogglesState } from 'store/toggleState';
import { Colors } from 'const/global-styles';
import Button from 'components/common/Button';
import useNearbyRestaurantsQuery from 'query/hooks/restaurants/useNearbyRestaurantsQuery';
import BriefRestaurantInfo from '../common/BriefRestaurantInfo';

export default function RepresentationRestaurantInfo() {
  const { restaurants } = useNearbyRestaurantsQuery();
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
      {restaurants?.restaurants && (
        <View style={styles.wrap}>
          <Button onPress={openRestaurantListHandler} style={styles.listWrap}>
            <BriefRestaurantInfo
              restaurant={restaurants.restaurants[0]}
              isList={false}
              fnc={openRestaurantListHandler}
            />
          </Button>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    backgroundColor: Colors.mainWhite1,
    opacity: 0.75,
    borderTopWidth: 1,
    borderColor: Colors.mainGreen2,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  listWrap: {
    width: '100%',
    height: 95,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
