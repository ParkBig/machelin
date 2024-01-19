import { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';

interface Props {
  image: string;
}

export default function PostingImage({ image }: Props) {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    Image.getSize(image, (width, height) => {
      setImageSize({ width, height });
    });
  }, []);

  return <Image style={styles.image} source={{ uri: image }} resizeMode="contain" />;
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
