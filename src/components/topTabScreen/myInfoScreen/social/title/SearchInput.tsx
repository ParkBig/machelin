import { Colors } from 'const/global-styles';
import { StyleSheet, TextInput } from 'react-native';
import { useRecoilState } from 'recoil';
import { searchNickNameState } from 'store/searchState';

export default function SearchInput() {
  const [searchNickName, setSearchNickName] = useRecoilState(searchNickNameState);

  const onFocusHandler = () => {
    setSearchNickName(prev => ({ ...prev, isTyping: true }));
  };

  const searchHandler = () => {
    setSearchNickName(prev => ({ ...prev, isTyping: false }));
  };

  const searchTextChangeHandler = (searchText: string) => {
    setSearchNickName(prev => ({ ...prev, searchText }));
  };

  return (
    <TextInput
      style={styles.textInput}
      autoCorrect={false}
      autoCapitalize="none"
      placeholder="닉네임 검색"
      onFocus={onFocusHandler}
      onEndEditing={searchHandler}
      onChangeText={searchTextChangeHandler}
      value={searchNickName.searchText}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.mainGreen2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: Colors.mainWhite1,
  },
});
