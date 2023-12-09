import { StyleSheet, Text, View } from 'react-native';

export default function BriefIntro() {
  return (
    <View style={styles.wrap}>
      <Text>마슐랭</Text>
      <Text>회원가입을 하여 마슐랭 기록을 남겨보아요!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1.2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
