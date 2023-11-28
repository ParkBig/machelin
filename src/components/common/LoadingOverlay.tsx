import { Colors } from 'const/global-styles';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function LoadingOverlay() {
  return (
    <View style={styles.wrap}>
      <ActivityIndicator size={45} color={Colors.mainGreen3} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: Colors.lightGrayOpacity1,
    zIndex: 100,
  },
});
