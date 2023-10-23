import { LayoutAnimation, Pressable, StyleSheet } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { mapLocationState } from 'store/locationState';
import { toggleRestaurantsListState } from 'store/toggleState';
import { mockRestaurantList } from 'data/mockRestaurantList';
import BriefRestaurantInfo from './BriefRestaurantInfo';
import { Colors } from 'const/global-styles';
import FunctionBar from './FunctionBar';
import Button from 'components/common/Button';

export default function RepresentationResTaurant() {
  const mockData = mockRestaurantList;
  const setMapLocation = useSetRecoilState(mapLocationState);
  const setToggleRestaurantList = useSetRecoilState(toggleRestaurantsListState);

  const openRestaurantListHandler = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMapLocation(prev => ({
      ...prev,
      latitude: prev.latitude - 0.0045,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }));
    setToggleRestaurantList(true);
  };

  return (
    <>
      <FunctionBar />
      <Button onPress={openRestaurantListHandler} style={styles.listWrap}>
        <BriefRestaurantInfo restaurant={mockData[0]} isList={false} fnc={openRestaurantListHandler} />
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  listWrap: {
    width: '100%',
    height: 95,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.75,
    borderTopColor: Colors.mainGreen3,
    borderTopWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: 'hidden',
    backgroundColor: Colors.mainWhite1,
  },
});
