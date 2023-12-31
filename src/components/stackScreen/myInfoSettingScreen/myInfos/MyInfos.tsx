import { ScrollView, StyleSheet } from 'react-native';
import MyImage from './MyImage';
import MainInfos from './mainInfos/MainInfos';
import AdditionalInfos from './additionalInfos/AdditionalInfos';

export default function MyInfos() {
  return (
    <ScrollView style={styles.wrap} showsVerticalScrollIndicator={false}>
      <MyImage />
      <MainInfos />
      <AdditionalInfos />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingHorizontal: 5,
  },
});
