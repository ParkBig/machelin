import { StyleSheet, View } from 'react-native';
import MyImage from './MyImage';
import MainInfos from './mainInfos/MainInfos';
import AdditionalInfos from './additionalInfos/AdditionalInfos';

export default function MyInfo() {
  return (
    <View style={styles.wrap}>
      <MyImage />
      <MainInfos />
      <AdditionalInfos />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
  },
});
