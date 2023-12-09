import MyLocationPing from 'components/common/map/MyLocationPing';
import BookmarkPings from './pings/BookmarkPings';
import PostPings from './pings/PostPings';
import MachelinMap from 'components/common/map/MachelinMap';

export default function MyMap() {
  return (
    <MachelinMap>
      <MyLocationPing />
      <BookmarkPings />
      <PostPings />
    </MachelinMap>
  );
}
