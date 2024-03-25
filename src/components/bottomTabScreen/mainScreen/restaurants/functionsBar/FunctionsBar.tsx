import { StyleSheet, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { toggleNearbySearchState } from 'store/toggleState';
import OnNearbySearch from './OnNearbySearch';
import OffNearbySearch from './OffNearbySearch';

export default function FunctionsBar() {
  const toggleNearbySearch = useRecoilValue(toggleNearbySearchState);

  return <View style={styles.wrap}>{toggleNearbySearch ? <OnNearbySearch /> : <OffNearbySearch />}</View>;
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 5,
    gap: 10,
  },
});
