import Button from 'components/common/layout/Button';
import { Size } from 'const/global-styles';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
  pfp: string;
  nickname: string;
}

export default function Info({ pfp, nickname }: Props) {
  return (
    <View style={styles.writerInfo}>
      <Button>
        <Image style={styles.writerImage} source={pfp ? { uri: pfp } : require('assets/png/user.png')} />
      </Button>
      <Button style={styles.writer}>
        <Text style={styles.writerText}>{nickname}</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  writerInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  writerImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  writer: {
    flex: 1,
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  writerText: {
    fontSize: Size.normalBig,
  },
});
