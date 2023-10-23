import { Pressable, ViewStyle } from 'react-native';

interface Props {
  onPress?: () => void;
  style?: ViewStyle;
  children: React.ReactNode;
}

export default function Button({ style, children, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [pressed && { opacity: 0.7 }, style]}>
      {children}
    </Pressable>
  );
}
