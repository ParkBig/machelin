import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Size } from 'const/global-styles';

interface Props {
  type: 'follow' | 'follower';
}

export default function NoSocial({ type }: Props) {
  const string = type === 'follow' ? '팔로우가 없어요...' : '팔로워가 없어요...';

  return (
    <View style={styles.wrap}>
      <View>
        <Ionicons name="people-outline" size={100} color={Colors.gray} />
      </View>
      <Text style={styles.text}>{string}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  text: {
    fontSize: Size.normalBig,
    color: Colors.gray,
  },
});
