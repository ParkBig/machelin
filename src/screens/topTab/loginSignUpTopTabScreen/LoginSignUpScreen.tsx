import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SignUpButton from 'components/topTabScreen/loginSignUpScreen/SignUpButton';
import GotoLoginButton from 'components/topTabScreen/loginSignUpScreen/GotoLoginButton';

export default function LoginSignUpScreen() {
  return (
    <View style={styles.wrap}>
      <View style={styles.notice}>
        <Ionicons name="restaurant" size={150} color={Colors.mainGreen2} />
        <View style={styles.contents}>
          <Text style={styles.titleText}>마슐랭</Text>
          <Text style={styles.subTitleText}>음식, 여행, 기록</Text>
          <Text style={styles.subTitleText}>음식을 찾고, 리뷰하여</Text>
          <Text style={styles.subTitleText}>여정을 기록해보세요!</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <SignUpButton />
        <GotoLoginButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainWhite1,
  },
  notice: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  contents: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: Size.colossalBig,
    color: Colors.mainGreen2,
  },
  subTitleText: {
    fontWeight: 'bold',
    fontSize: Size.normalMiddle,
    color: Colors.mainGreen2,
  },
  buttons: {
    flex: 2,
    width: '100%',
    paddingHorizontal: 20,
    gap: 10,
  },
});
