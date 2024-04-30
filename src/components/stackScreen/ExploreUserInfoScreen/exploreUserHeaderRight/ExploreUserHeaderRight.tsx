import { StyleSheet, View } from 'react-native';
import ToggleFollow from './ToggleFollow';
import ToggleUserBlock from './ToggleUserBlock';

interface Props {
  exploreUserId: number;
}

export default function ExploreUserHeaderRight({ exploreUserId }: Props) {
  return (
    <View style={styles.wrap}>
      <ToggleFollow exploreUserId={exploreUserId} />
      <ToggleUserBlock exploreUserId={exploreUserId} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    gap: 10,
  },
});
