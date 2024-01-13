import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Size } from 'const/global-styles';

export default function NoGoogleReviews() {
  return (
    <View style={styles.wrap}>
      <Ionicons name="logo-google" size={100} color={Colors.mainGreen2} />
      <View>
        <Text style={styles.text}>구글 리뷰가 없어요</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    color: Colors.mainGreen2,
    fontWeight: 'bold',
    fontSize: Size.normalMiddle,
  },
});
