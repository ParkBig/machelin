import { useNetInfo } from '@react-native-community/netinfo';
import useNearbyRestaurantsSearchQuery from 'query/hooks/restaurants/useNearbyRestaurantsSearchQuery';
import { StyleSheet, Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { searchRadiusState } from 'store/locationState';
import { mainSearchState } from 'store/searchState';

export default function InstanceInfo() {
  const netInfo = useNetInfo();
  const searchRadius = useRecoilValue(searchRadiusState);
  const { mainSearchValue } = useRecoilValue(mainSearchState);
  const { restaurants } = useNearbyRestaurantsSearchQuery();

  const restaurantsLength = restaurants?.pages ? `${restaurants.pages.length}개` : '';

  return (
    <View style={styles.wrap}>
      {netInfo.isConnected && (
        <>
          <View style={styles.instanceInfo}>
            <View style={styles.title}>
              <Text style={styles.text}>{mainSearchValue ? '검색결과' : '내주변'}</Text>
              <Text style={styles.text}>({searchRadius}m)</Text>
            </View>
            <View style={styles.restaurantsLength}>
              <Text style={styles.text}>{restaurantsLength}</Text>
            </View>
          </View>
          <View style={styles.ad}></View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  instanceInfo: {
    height: '100%',
    flexDirection: 'row',
    paddingHorizontal: 5,
    gap: 10,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantsLength: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
  ad: {
    flex: 1,
  },
});
