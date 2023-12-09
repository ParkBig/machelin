import { Colors } from 'const/global-styles';
import { ActivityIndicator, View, ViewStyle } from 'react-native';

interface Props {
  style: ViewStyle;
}

export default function LoadingOverlay({style}: Props) {
  return (
    <View style={style}>
      <ActivityIndicator size={45} color={Colors.mainGreen3} />
    </View>
  );
}
