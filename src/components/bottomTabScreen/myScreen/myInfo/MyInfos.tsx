import { StyleSheet, View } from 'react-native';
import LoginInfo from './loginInfo/LoginInfo';
import AdditionalInfos from './additionalInfo/AdditionalInfos';

export default function MyInfos() {
  return (
    <View style={styles.wrap}>
      <LoginInfo/>
      <AdditionalInfos />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
});
