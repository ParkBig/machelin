import Button from 'components/common/Button';
import { DEFAULT_IMAGE } from 'const/default';
import { Size } from 'const/global-styles';
import { Image, StyleSheet, Text } from 'react-native';

interface Props {
  pfp: string;
  nickname: string;
}

export default function Writer({ pfp, nickname }: Props) {
  return (
    <Button style={styles.writerInfo}>
      <Image style={styles.writerImage} source={{ uri: pfp ? pfp : DEFAULT_IMAGE }} />
      <Text style={styles.writerText}>{nickname}</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  writerInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 5,
  },
  writerImage: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  writerText: {
    fontSize: Size.normalMiddle,
  },
});
