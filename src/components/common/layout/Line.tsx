import { View, ViewStyle } from 'react-native';

interface Props {
  style: ViewStyle;
}

export default function Line({ style }: Props) {
  return <View style={style} />;
}
