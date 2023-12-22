import { StyleSheet, View } from 'react-native';
import { Colors } from 'const/global-styles';
import useNearbyRestaurantsSearchQuery from 'query/hooks/restaurants/useNearbyRestaurantsSearchQuery';
import { FlatList } from 'react-native-gesture-handler';
import Line from 'components/common/layout/Line';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import { useSetRecoilState } from 'recoil';
import { focusedRestaurantState } from 'store/locationState';
import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import BriefRestaurantInfo from 'components/common/card/BriefRestaurantInfo';
import NoResults from 'components/bottomTabScreen/regionalSearchScreen/results/NoResults';
import { UseNavigation } from 'types/screenType';

export default function RestaurantList() {
  const { navigate } = useNavigation<UseNavigation<'MainScreen'>>();
  const setFocusedRestaurant = useSetRecoilState(focusedRestaurantState);
  const { restaurants, fetchNextPageRestaurants, isFetchingNextPage, restaurantsIsLoading } = useNearbyRestaurantsSearchQuery();

  const restaurantsIsExist = restaurants?.pages && restaurants.pages.length !== 0 ? true : false;

  const onEndReachedHandler = () => {
    fetchNextPageRestaurants();
  };

  return (
    <View style={styles.wrap}>
      {restaurantsIsExist ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={restaurants?.pages}
          onEndReached={onEndReachedHandler}
          ItemSeparatorComponent={() => <Line style={styles.line} />}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item }) => {
            const restaurantChoiceHandler = () => {
              const { lat, lng } = item.geometry.location;
              setFocusedRestaurant({
                isFocused: true,
                id: item.place_id,
                latitude: lat,
                longitude: lng,
              });
            };

            const goToDetailRestaurantInfoHandler = () => {
              navigate('RestaurantDetailScreen', {
                restaurantName: item.name,
                restaurantId: item.place_id,
              });
            };

            return (
              <Button style={styles.button} onPress={restaurantChoiceHandler}>
                <BriefRestaurantInfo restaurant={item} isList={true} fnc={goToDetailRestaurantInfoHandler} />
              </Button>
            );
          }}
        />
      ) : (
        <NoResults />
      )}
      {restaurantsIsLoading && <LoadingOverlay style={styles.defaultLoading} />}
      {isFetchingNextPage && <LoadingOverlay style={styles.moreDataLoading} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    maxHeight: 363,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: Colors.mainWhite1,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.superLightGray,
  },
  button: {
    width: '100%',
    paddingHorizontal: 10,
  },
  defaultLoading: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  moreDataLoading: {
    width: '100%',
    height: '100%',
    paddingBottom: 20,
    justifyContent: 'flex-end',
    position: 'absolute',
  },
});
