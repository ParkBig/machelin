import Line from 'components/common/layout/Line';
import { Colors } from 'const/global-styles';
import { StyleSheet, View } from 'react-native';
import ActivityZone from './ActivityZone';
import PreferFoods from './PreferFoods';
import PreferRestaurant from './PreferRestaurant';

export default function AdditionalInfos() {
  return (
    <View style={styles.wrap}>
      <ActivityZone />
      <Line style={styles.line} />
      <PreferFoods />
      <Line style={styles.line} />
      <PreferRestaurant />
      {/* <Line style={styles.line} />
      <MedalsEarned /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    marginBottom: 30,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: Colors.mainGreen2,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.mainGreen2,
  },
});
