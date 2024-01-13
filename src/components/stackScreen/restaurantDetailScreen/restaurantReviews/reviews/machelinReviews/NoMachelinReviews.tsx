import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Size } from 'const/global-styles';
import Button from 'components/common/layout/Button';

interface Props {
  goToMakePostHandler: () => void;
}

export default function NoMachelinReviews({ goToMakePostHandler }: Props) {
  return (
    <Button style={styles.wrap} onPress={goToMakePostHandler}>
      <Ionicons name="restaurant" size={100} color={Colors.mainGreen2} />
      <View>
        <Text style={styles.text}>마슐랭 리뷰가 없네요</Text>
        <Text style={styles.text}>처음으로 남겨볼까요?</Text>
      </View>
    </Button>
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
