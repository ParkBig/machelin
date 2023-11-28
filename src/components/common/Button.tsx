import { Pressable, ViewStyle } from 'react-native';

interface Props {
  onPress?: () => void;
  style?: ViewStyle;
  children: React.ReactNode;
}

export default function Button({ style, children, onPress }: Props) {
  const dynamicStyle = ({ pressed }: { pressed: boolean }) => ({
    opacity: pressed ? 0.7 : 1,
    ...(style),
  });

  return (
    <Pressable onPress={onPress} style={dynamicStyle}>
      {children}
    </Pressable>
  );
}
