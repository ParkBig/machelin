import { SearchName, SearchSubName, SubName } from 'data/administrativeDistrict';
import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SearchState } from './AreaPicker';

interface Props {
  values: SearchName[] | SubName;
  searchType: SearchState;
  which: 'name' | 'subName';
  setSearchType: React.Dispatch<React.SetStateAction<SearchState>>;
}

export default function SearchPicker({ values, searchType, which, setSearchType }: Props) {
  const whichValue = which === 'name' ? 'name' : 'subName';

  const valueChangeHandler = (itemValue: any) => {
    setSearchType(prev => ({ ...prev, [whichValue]: itemValue }))
  }

  return (
    <View style={styles.wrap}>
      <Picker
        selectedValue={searchType[whichValue]}
        onValueChange={valueChangeHandler}
      >
        {values.map(value => <Picker.Item label={value} value={value} key={value} />)}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1.5,
    height: '100%',
    justifyContent: 'center',
  },
});
