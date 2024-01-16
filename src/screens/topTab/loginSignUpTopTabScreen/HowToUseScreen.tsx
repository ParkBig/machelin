import { Colors, Size } from 'const/global-styles';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HowToUseScreen() {
  return (
    <ScrollView style={styles.wrap}>
      <View style={styles.title}>
        <Ionicons name="restaurant" size={150} color={Colors.mainGreen2} />
        <Text style={styles.text}>마슐랭 가이드</Text>
      </View>
      <View style={styles.content}>
        <Image style={styles.image} resizeMode="contain" source={require('assets/promotion/4-1.png')} />
        <Text style={styles.text}>나를 나타낼 수 있는 정보를 기록해요</Text>
      </View>
      <View style={styles.content}>
        <Image style={styles.image} resizeMode="contain" source={require('assets/promotion/4-2.png')} />
        <Text style={styles.text}>어디서든 게시글을 작성할 수 있어요</Text>
        <Text style={styles.text}>국내에서도 해외에서도!</Text>
      </View>
      <View style={styles.content}>
        <Image style={styles.image} resizeMode="contain" source={require('assets/promotion/4-3.png')} />
        <Text style={styles.text}>기억하고 싶은 식당을 북마크 할 수 있어요</Text>
      </View>
      <View style={styles.content}>
        <Image style={styles.image} resizeMode="contain" source={require('assets/promotion/4-4.png')} />
        <Text style={styles.text}>맛집을 찾는건 여행과 같죠</Text>
        <Text style={styles.text}>여행을 떠나며 내가 다녀온 곳에 도장을 찍어 기록해요</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.mainWhite1,
  },
  title: {
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  content: {
    width: '100%',
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: Size.normalBig,
    color: Colors.mainGreen2,
  },
});
