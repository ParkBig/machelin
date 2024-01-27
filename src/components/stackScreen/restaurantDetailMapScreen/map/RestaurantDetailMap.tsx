import MachelinMap from 'components/common/map/MachelinMap';
import MyLocationPing from 'components/common/map/MyLocationPing';
import RestaurantDetailPing from './RestaurantDetailPing';
import { useSetRecoilState } from 'recoil';
import { mapLocationState } from 'store/locationState';
import { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { UseRouter } from 'types/screenType';

export default function RestaurantDetailMap() {
  const { params } = useRoute<UseRouter<'RestaurantDetailMapScreen'>>();
  const setMapLocation = useSetRecoilState(mapLocationState);

  useEffect(() => {
    setMapLocation(prev => ({
      ...prev,
      latitude: params.restaurantLat,
      longitude: params.restaurantLng,
    }));
  }, [params]);

  return (
    <MachelinMap>
      <MyLocationPing />
      <RestaurantDetailPing />
    </MachelinMap>
  );
}
