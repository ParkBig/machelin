import { SearchName, SearchSubName, administrativeDistrict, administrativeDistrictName } from 'data/administrativeDistrict';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import SearchPicker from './SearchPicker';
import Nearby from './Nearby';
import { Colors } from 'const/global-styles';

export interface SearchState {
  name: SearchName;
  subName: SearchSubName;
}

export default function AreaPicker() {
  const [searchType, setSearchType] = useState<SearchState>({ name: '전체', subName: '전체' });

  return (
    <View style={styles.wrap}>
      <Ionicons name='map' size={25} color={Colors.mainGreen3} />
      <SearchPicker values={administrativeDistrictName} which='name' searchType={searchType} setSearchType={setSearchType} />
      <SearchPicker values={administrativeDistrict[searchType.name]} which='subName' searchType={searchType} setSearchType={setSearchType} />
      <Nearby />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 40,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.mainGreen2,
  },
});
