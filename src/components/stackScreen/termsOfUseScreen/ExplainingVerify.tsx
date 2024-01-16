import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ExplainingVerify() {
  return (
    <View style={styles.wrap}>
      <Ionicons name="restaurant" size={150} color={Colors.mainGreen2} />
      <View style={styles.title}>
        <Text style={styles.titleText}>마슐랭</Text>
      </View>
      <View style={styles.subtitle}>
        <Text style={styles.subTitleText}>전화번호를 인증하고 추후 아이디를 보호하세요</Text>
        <Text style={styles.subTitleText}>인증되지 않은 아이디는 찾을 수 없어요</Text>
        <Text style={styles.subTitleText}>전화번호를 인증하면 추후 업데이트에서</Text>
        <Text style={styles.subTitleText}>더 넓은 서비스를 이용할 수 있어요</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingVertical: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: Size.colossalBig,
    color: Colors.mainGreen2,
  },
  subtitle: {
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitleText: {
    fontWeight: 'bold',
    fontSize: Size.normalMiddle,
    color: Colors.mainGreen2,
  },
});
