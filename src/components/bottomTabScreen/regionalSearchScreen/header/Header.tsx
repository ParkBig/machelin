import { Colors } from 'const/global-styles';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import SearchModalToggleButton from './SearchModalToggleButton';

export default function Header() {
  return (
    <View style={styles.wrap}>
      <View style={styles.ionicons}>
        <Ionicons name="location" size={40} color={Colors.mainGreen2} />
      </View>
      <SearchModalToggleButton />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.mainGreen2,
    overflow: 'hidden',
  },
  ionicons: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
