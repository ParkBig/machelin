import { Colors, Size } from 'const/global-styles';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import Button from 'components/common/layout/Button';
import { useRecoilState } from 'recoil';
import { makePostState } from 'store/makePostState';
import Line from 'components/common/layout/Line';

export default function StarScore() {
  const [makePostInfo, setMakePostInfo] = useRecoilState(makePostState);
  const ratingArr = [1, 2, 3, 4, 5];

  const scoreChangeHandler = (rating: number) => {
    setMakePostInfo(prev => ({ ...prev, rating }));
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.main}>
        <View style={styles.title}>
          <Text style={styles.titleText}>나의점수</Text>
          <Line style={styles.line} />
        </View>
        <View style={styles.stars}>
          {ratingArr.map(rating => (
            <Button key={rating} onPress={scoreChangeHandler.bind(null, rating)}>
              <Ionicons name={makePostInfo.rating >= rating ? 'star' : 'star-outline'} size={Size.bigSuper} />
            </Button>
          ))}
        </View>
      </View>
      <View style={styles.sub}>
        <View style={styles.explanation}>
          <View style={styles.explain}>
            <Text style={styles.explainText}>극상의 식당.</Text>
          </View>
          <View style={styles.stars}>
            <Ionicons name="star" size={Size.normalMiddle} color={Colors.darkGray} />
            <Ionicons name="star" size={Size.normalMiddle} color={Colors.darkGray} />
            <Ionicons name="star" size={Size.normalMiddle} color={Colors.darkGray} />
            <Ionicons name="star" size={Size.normalMiddle} color={Colors.darkGray} />
            <Ionicons name="star" size={Size.normalMiddle} color={Colors.darkGray} />
          </View>
        </View>
        <Line style={styles.explainLine} />
        <View style={styles.explanation}>
          <View style={styles.explain}>
            <Text style={styles.explainText}>계속 방문할 것이다. </Text>
          </View>
          <View style={styles.stars}>
            <Ionicons name="star" size={Size.normalMiddle} color={Colors.darkGray} />
            <Ionicons name="star" size={Size.normalMiddle} color={Colors.darkGray} />
            <Ionicons name="star" size={Size.normalMiddle} color={Colors.darkGray} />
            <Ionicons name="star" size={Size.normalMiddle} color={Colors.darkGray} />
            <Ionicons name="star-outline" size={Size.normalMiddle} color={Colors.darkGray} />
          </View>
        </View>
        <Line style={styles.explainLine} />
        <View style={styles.explanation}>
          <View style={styles.explain}>
            <Text style={styles.explainText}>맛과 가격이 합리적이다.</Text>
          </View>
          <View style={styles.stars}>
            <Ionicons name="star" size={Size.normalMiddle} color={Colors.darkGray} />
            <Ionicons name="star" size={Size.normalMiddle} color={Colors.darkGray} />
            <Ionicons name="star" size={Size.normalMiddle} color={Colors.darkGray} />
            <Ionicons name="star-outline" size={Size.normalMiddle} color={Colors.darkGray} />
            <Ionicons name="star-outline" size={Size.normalMiddle} color={Colors.darkGray} />
          </View>
        </View>
        <Line style={styles.explainLine} />
        <View style={styles.explanation}>
          <View style={styles.explain}>
            <Text style={styles.explainText}>맛, 서비스가 조금 아쉽다.</Text>
          </View>
          <View style={styles.stars}>
            <Ionicons name="star" size={Size.normalMiddle} color={Colors.darkGray} />
            <Ionicons name="star" size={Size.normalMiddle} color={Colors.darkGray} />
            <Ionicons name="star-outline" size={Size.normalMiddle} color={Colors.darkGray} />
            <Ionicons name="star-outline" size={Size.normalMiddle} color={Colors.darkGray} />
            <Ionicons name="star-outline" size={Size.normalMiddle} color={Colors.darkGray} />
          </View>
        </View>
        <Line style={styles.explainLine} />
        <View style={styles.explanation}>
          <View style={styles.explain}>
            <Text style={styles.explainText}>최악.</Text>
          </View>
          <View style={styles.stars}>
            <Ionicons name="star" size={Size.normalMiddle} color={Colors.darkGray} />
            <Ionicons name="star-outline" size={Size.normalMiddle} color={Colors.darkGray} />
            <Ionicons name="star-outline" size={Size.normalMiddle} color={Colors.darkGray} />
            <Ionicons name="star-outline" size={Size.normalMiddle} color={Colors.darkGray} />
            <Ionicons name="star-outline" size={Size.normalMiddle} color={Colors.darkGray} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    borderBottomColor: Colors.mainGreen1,
    borderBottomWidth: 1.5,
  },
  main: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  line: {
    width: 2,
    height: '50%',
    backgroundColor: Colors.mainGreen2,
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 10,
  },
  titleText: {
    fontSize: Size.normalSmallMiddle,
    fontWeight: 'bold',
  },
  sub: {
    width: '100%',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.superLightGray,
    gap: 5,
  },
  explanation: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  explain: {
    width: '50%',
  },
  explainText: {
    color: Colors.gray,
  },
  explainLine: {
    height: 1,
    width: '100%',
    marginVertical: 5,
    backgroundColor: Colors.superLightGray
  }
});
