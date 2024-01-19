import { Colors } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  ownerSubLocality: string;
}

export default function PlaceMade({ ownerSubLocality }: Props) {
  return (
    <View>
      <Text style={styles.text}>{ownerSubLocality}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.gray,
  },
});
