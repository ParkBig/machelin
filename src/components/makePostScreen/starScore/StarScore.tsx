import { Colors, Size } from 'const/global-styles';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import Button from 'components/common/Button';
import { useRecoilState } from 'recoil';
import { makePostState } from 'store/makePostState';
import Line from 'components/common/Line';

export default function StarScore() {
  const [makePostInfo, setMakePostInfo] = useRecoilState(makePostState);
  const ratingArr = [1, 2, 3, 4, 5];

  const scoreChangeHandler = (rating: number) => {
    setMakePostInfo(prev => ({ ...prev, rating }))
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.title}>
        <Text style={styles.text}>나의점수</Text>
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
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.mainGreen1,
    borderBottomWidth: 1.5,
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
    backgroundColor: Colors.mainGreen2
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontSize: Size.normalSmallMiddle,
    fontWeight: 'bold',
  },
});
