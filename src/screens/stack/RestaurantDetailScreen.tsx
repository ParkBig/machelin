import { ScrollView, StyleSheet } from 'react-native';
import { StackScreenPropsAbout } from 'types/screenType';
import RestaurantInfos from 'components/stackScreen/restaurantDetailScreen/RestaurantInfos';
import RestaurantGrade from 'components/stackScreen/restaurantDetailScreen/RestaurantGrade';
import RestaurantImg from 'components/stackScreen/restaurantDetailScreen/RestaurantImg';
import { Colors } from 'const/global-styles';
import { useState } from 'react';
import useRestaurantDetailQuery from 'query/hooks/restaurants/useRestaurantDetailQuery';
import { RefreshControl } from 'react-native-gesture-handler';
import Line from 'components/common/layout/Line';
import RestaurantReviews from 'components/stackScreen/restaurantDetailScreen/restaurantReviews/RestaurantReviews';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import RestaurantInfoFunction from 'components/stackScreen/restaurantDetailScreen/RestaurantInfoFunction';

export default function RestaurantDetailScreen({ route }: StackScreenPropsAbout<'RestaurantDetailScreen'>) {
  const [refreshing, setRefreshing] = useState(false);
  const { restaurantDetailIsLoading, reRestaurantDetail } = useRestaurantDetailQuery(route.params.restaurantId);

  const onRefreshHandler = () => {
    setRefreshing(true);
    reRestaurantDetail();
    setRefreshing(false);
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.wrap}
        scrollEnabled={!restaurantDetailIsLoading}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />}
      >
        <RestaurantImg />
        <RestaurantGrade />
        <Line style={styles.innerLine} />
        <RestaurantInfos />
        <Line style={styles.innerLine} />
        <RestaurantInfoFunction />
        <RestaurantReviews />
      </ScrollView>
      {restaurantDetailIsLoading && <LoadingOverlay style={styles.loadingOverlay} />}
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.mainWhite1,
  },
  innerLine: {
    marginHorizontal: 15,
    flex: 1,
    height: 2,
    backgroundColor: Colors.mainGreen2,
  },
  line: {
    width: '100%',
    height: 5,
    backgroundColor: Colors.mainGreen2,
  },
  loadingOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGrayOpacity1,
    position: 'absolute',
    zIndex: 100,
  },
});
