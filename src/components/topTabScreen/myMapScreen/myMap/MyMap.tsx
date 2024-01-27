import MyLocationPing from 'components/common/map/MyLocationPing';
import BookmarkPings from './pings/BookmarkPings';
import PostPings from './pings/PostPings';
import MachelinMap from 'components/common/map/MachelinMap';
import StampPings from './pings/StampPings';
import { mapLocationState, myLocationState } from 'store/locationState';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { PermissionStatus, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';

export default function MyMap() {
  const setMyLocation = useSetRecoilState(myLocationState);
  const setMapLocation = useSetRecoilState(mapLocationState);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== PermissionStatus.GRANTED) {
        return;
      }

      const getMyLocation = await getCurrentPositionAsync();
      const latitude = getMyLocation.coords.latitude;
      const longitude = getMyLocation.coords.longitude;

      setMyLocation({
        isGetLocation: true,
        latitude,
        longitude,
      });

      setMapLocation(prev => ({
        ...prev,
        latitude,
        longitude,
      }));
    };

    getLocation();
  }, [setMyLocation, setMapLocation]);

  return (
    <MachelinMap>
      <MyLocationPing />
      <StampPings />
      <BookmarkPings />
      <PostPings />
    </MachelinMap>
  );
}
