import { Colors } from 'const/global-styles';
import { ActivityIndicator, View, ViewStyle } from 'react-native';

interface Props {
  style: ViewStyle;
  size?: number;
  color?: string;
}

export default function LoadingOverlay({ style, size, color }: Props) {
  return (
    <View style={style}>
      <ActivityIndicator size={size ? size : 45} color={color ? color : Colors.mainGreen3} />
    </View>
  );
}
