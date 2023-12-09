import Button from 'components/common/layout/Button';
import { Size } from 'const/global-styles';
import { Image, StyleSheet, Text } from 'react-native';

interface Props {
  pfp: string;
  nickname: string;
}

export default function Info({ pfp, nickname }: Props) {
  return (
    <Button style={styles.writerInfo}>
      <Image style={styles.writerImage} source={pfp ? { uri: pfp } : require('assets/png/user.png')} />
      <Text style={styles.writerText}>{nickname}</Text>
    </Button>
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
  writerText: {
    fontSize: Size.normalBig,
  },
});
