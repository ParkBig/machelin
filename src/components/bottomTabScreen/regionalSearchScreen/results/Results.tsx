import useRegionalRestaurantSearchQuery from 'query/hooks/restaurants/useRegionalRestaurantSearchQuery';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import Button from 'components/common/layout/Button';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'const/global-styles';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screen/screenType';
import NoResults from './NoResults';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import BriefRestaurantInfo from 'components/common/card/BriefRestaurantInfo';
import { useState } from 'react';

export default function Results() {
  const { navigate } = useNavigation<UseNavigation<'MachelinLankScreen'>>();
  const [refreshing, setRefreshing] = useState(false);
  const { restaurants, restaurantsIsLoading, reRestaurants } = useRegionalRestaurantSearchQuery();

  const restaurantsIsExist = restaurants?.restaurants && restaurants.restaurants.length !== 0 ? true : false;

  const onPressHandler = () => {
    navigate('MachelinLankMapScreen');
  };

  const onRefreshHandler = () => {
    setRefreshing(true);
    reRestaurants();
    setRefreshing(false);
  };

  return (
    <View style={styles.wrap}>
      {restaurantsIsExist ? (
        <>
          <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />}
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
            data={restaurants?.restaurants}
            keyExtractor={item => item.place_id}
            contentContainerStyle={{ paddingBottom: 90 }}
            renderItem={({ item }) => {
              const navigateHandler = () => {
                navigate('RestaurantDetailScreen', {
                  restaurantId: item.place_id,
                  restaurantName: item.name,
                });
              };

              return <BriefRestaurantInfo restaurant={item} isList={true} fnc={navigateHandler} />;
            }}
          />
          <Button style={styles.button} onPress={onPressHandler}>
            <Ionicons style={styles.ionicons} size={35} name="map" color={Colors.mainWhite3} />
          </Button>
        </>
      ) : (
        <NoResults />
      )}
      {restaurantsIsLoading && <LoadingOverlay style={styles.loadingOverlay} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    position: 'relative',
  },
  flatList: {
    flex: 1,
  },
  button: {
    height: 55,
    width: 55,
    borderRadius: 27.5,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 20,
    right: 10,
    backgroundColor: Colors.mainGreen2,
  },
  ionicons: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  loadingOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
