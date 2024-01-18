import MachelinMap from 'components/common/map/MachelinMap';
import MyLocationPing from 'components/common/map/MyLocationPing';
import RestaurantDetailPing from './RestaurantDetailPing';

export default function RestaurantDetailMap() {
  return (
    <MachelinMap>
      <MyLocationPing />
      <RestaurantDetailPing />
    </MachelinMap>
  );
}
