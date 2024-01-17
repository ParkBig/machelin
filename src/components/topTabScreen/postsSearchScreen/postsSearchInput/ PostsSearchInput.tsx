import { Colors, Size } from 'const/global-styles';
import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRecoilState } from 'recoil';
import { postSearchInputState } from 'store/searchState';
import Button from 'components/common/layout/Button';

export default function PostsSearchInput() {
  const [postSearchInput, setPostSearchInput] = useRecoilState(postSearchInputState);

  const onFocusHandler = () => {
    setPostSearchInput(prev => ({ ...prev, isTyping: true }));
  };

  const searchHandler = () => {
    setPostSearchInput(prev => ({ ...prev, isTyping: false }));
  };

  const searchTextChangeHandler = (searchText: string) => {
    setPostSearchInput(prev => ({ ...prev, searchText }));
  };

  const deleteHandler = () => {
    setPostSearchInput(prev => ({ ...prev, searchText: '' }));
  };

  return (
    <View style={styles.wrap}>
      <TextInput
        style={styles.textInput}
        placeholder="게시글 검색"
        autoCorrect={false}
        autoCapitalize="none"
        onFocus={onFocusHandler}
        onEndEditing={searchHandler}
        onChangeText={searchTextChangeHandler}
        value={postSearchInput.searchText}
      />
      <Button style={styles.ionicons} onPress={deleteHandler}>
        <Ionicons name="close" size={30} color={Colors.mainGreen2} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 15,
  },
  textInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mainGreen2,
  },
  ionicons: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.mainGreen2,
  },
});
