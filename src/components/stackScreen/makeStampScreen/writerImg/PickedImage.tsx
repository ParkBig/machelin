import { Image, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/layout/Button';
import { useSetRecoilState } from 'recoil';
import { Colors } from 'const/global-styles';
import { makeStampState } from 'store/makeStampState';

interface Props {
  uri: string;
}

export default function PickedImage({ uri }: Props) {
  const setMakeStampValues = useSetRecoilState(makeStampState);

  const deleteImageHandler = () => {
    setMakeStampValues(prev => ({ ...prev, images: prev.images.filter(image => image !== uri) }));
  };

  return (
    <View style={styles.wrap}>
      <Button style={styles.button} onPress={deleteImageHandler}>
        <Ionicons name="close-circle" size={40} color={Colors.mainGreen1} />
      </Button>
      <Image style={styles.image} source={{ uri }} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
  },
  button: {
    top: 0,
    right: 0,
    position: 'absolute',
    zIndex: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
