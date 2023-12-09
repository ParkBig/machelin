import Button from 'components/common/layout/Button';
import Line from 'components/common/layout/Line';
import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'const/global-styles';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { searchNickNameState } from 'store/searchState';

export default function Search() {
  const [textInputValue, setTextInputValue] = useState('');
  const setSearchNickName = useSetRecoilState(searchNickNameState);

  const textInputValueChangeHandler = (text: string) => {
    setTextInputValue(text);
  };

  const searchQueryHandler = () => {
    setSearchNickName(textInputValue);
  };

  const initTextInputValue = () => {
    setTextInputValue('');
  };

  return (
    <View style={styles.wrap}>
      <Line style={styles.line} />
      <TextInput
        style={styles.textInput}
        placeholder="검색"
        value={textInputValue}
        onChangeText={textInputValueChangeHandler}
        onSubmitEditing={searchQueryHandler}
      />
      <Line style={styles.line} />
      <Button style={styles.initButton} onPress={initTextInputValue}>
        <Ionicons name="close-outline" size={30} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  line: {
    width: 1,
    height: 25,
    backgroundColor: Colors.mainGreen1,
  },
  initButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
