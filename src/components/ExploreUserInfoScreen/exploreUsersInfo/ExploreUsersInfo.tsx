import { StyleSheet, View } from 'react-native';
import BriefExploreUsersInfo from './BriefExploreUsersInfo';
import ExploreUsersAdditionalInfos from './ExploreUsersAdditionalInfos';

export default function ExploreUsersInfo() {
  return (
    <View style={styles.wrap}>
      <BriefExploreUsersInfo />
      <ExploreUsersAdditionalInfos />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 10,
    marginBottom: 10,
  },
});
