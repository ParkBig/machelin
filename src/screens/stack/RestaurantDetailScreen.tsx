import { ScrollView, StyleSheet } from 'react-native';
import { StackScreenPropsAbout } from 'types/screen/screenType';
import RestaurantInfos from 'components/restaurantDetailScreen/RestaurantInfos';
import RestaurantGrade from 'components/restaurantDetailScreen/RestaurantGrade';
import RestaurantImg from 'components/restaurantDetailScreen/RestaurantImg';
import { Colors } from 'const/global-styles';
import { useState } from 'react';
import useRestaurantDetailQuery from 'query/hooks/restaurants/useRestaurantDetailQuery';
import LoadingOverlay from 'components/common/LoadingOverlay';
import { RefreshControl } from 'react-native-gesture-handler';
import Line from 'components/common/Line';
import RestaurantReviews from 'components/restaurantDetailScreen/restaurantReviews/RestaurantReviews';

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
        style={styles.wrap}
        scrollEnabled={!restaurantDetailIsLoading}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />}
      >
        <RestaurantImg />
        <RestaurantGrade />
        <Line style={styles.line} />
        <RestaurantInfos />
        <Line style={styles.line} />
        <RestaurantReviews />
      </ScrollView>
      {restaurantDetailIsLoading && <LoadingOverlay />}
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.mainWhite1,
  },
  line: {
    width: '100%',
    height: 5,
    backgroundColor: Colors.superLightGray,
  },
});
