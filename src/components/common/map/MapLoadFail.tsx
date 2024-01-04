import { Image, StyleSheet, Text, View } from 'react-native';
import Button from '../layout/Button';
import { Colors } from 'const/global-styles';

interface Props {
  reloadHandler: () => void;
}

export default function MapLoadFail({ reloadHandler }: Props) {
  return (
    <View style={styles.wrap}>
      <Image style={styles.imag} source={require('assets/icon.png')} />
      <Button style={styles.button} onPress={reloadHandler}>
        <Text>지도를 불러오는데 실패했어요...</Text>
        <Text style={styles.retryText}>다시시도하기</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  imag: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
  },
  retryText: {
    color: Colors.gray,
  },
});
