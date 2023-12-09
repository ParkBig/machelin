import MachelinMap from "components/common/map/MachelinMap";
import MyLocationPing from "components/common/map/MyLocationPing";
import RestaurantPings from "components/common/map/RestaurantPings";

export default function RegionalSearchMap() {
  return (
    <MachelinMap>
      <MyLocationPing />
      <RestaurantPings />
    </MachelinMap>
  )
}