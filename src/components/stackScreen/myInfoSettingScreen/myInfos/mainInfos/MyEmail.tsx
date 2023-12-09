import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { StyleSheet, Text, View } from 'react-native';

export default function MyEmail() {
  const { myInfo } = useMyInfoQuery();

  return (
    <View style={styles.wrap}>
      <Text style={styles.titleText}>이메일</Text>
      <View style={styles.email}>
        <Text>{myInfo?.authUser?.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 60,
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
  },
  email: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.7,
    gap: 5,
  },
});
