import Button from 'components/common/Button';
import Line from 'components/common/Line';
import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  isFollow: boolean;
  setIsFollow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UsersSocialTitle({ isFollow, setIsFollow }: Props) {
  const toggleFollowHandler = (state: boolean) => {
    setIsFollow(state);
  };

  return (
    <View style={styles.wrap}>
      <Button style={styles.titleButton} onPress={toggleFollowHandler.bind(null, true)}>
        <Text style={[styles.titleText, isFollow && styles.focusedText]}>팔로우</Text>
      </Button>
      <Line style={styles.line} />
      <Button style={styles.titleButton} onPress={toggleFollowHandler.bind(null, false)}>
        <Text style={[styles.titleText, !isFollow && styles.focusedText]}>팔로워</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
    gap: 5,
  },
  titleButton: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  line: {
    height: '40%',
    width: 2,
    backgroundColor: Colors.mainGreen2,
  },
  titleText: {
    fontSize: Size.normalMiddle,
  },
  focusedText: {
    fontWeight: 'bold',
  },
});
