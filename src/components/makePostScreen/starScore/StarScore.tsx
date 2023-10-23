import { Colors, Size } from 'const/global-styles';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import Button from 'components/common/Button';
import { useRecoilState } from 'recoil';
import { makePostState } from 'store/makePostState';

export default function StarScore() {
  const [makePostInfo, setMakePostInfo] = useRecoilState(makePostState);
  const scoreArr = [1, 2, 3, 4, 5];

  const scoreChangeHandler = (score: number) => {
    setMakePostInfo(prev => ({ ...prev, score }))
  }

  return (
    <View style={styles.wrap}>
      <View>
        <Text style={styles.text}>나의점수</Text>
      </View>
      <View style={styles.stars}>
        {scoreArr.map(score => (
          <Button style={styles.starButton} key={score} onPress={scoreChangeHandler.bind(null, score)}>
            <Ionicons name={makePostInfo.score >= score ? 'star' : 'star-outline'} size={Size.colossalMiddle} />
          </Button>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.mainGreen2,
    borderBottomWidth: 2,
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 7,
  },
  starButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: Size.normalBig,
    fontWeight: 'bold',
  },
});
