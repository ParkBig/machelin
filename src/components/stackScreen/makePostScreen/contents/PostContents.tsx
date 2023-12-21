import { Size } from 'const/global-styles';
import { StyleSheet, TextInput, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { makePostState } from 'store/makePostState';

export default function PostContents() {
  const [makePostInfo, setMakePostInfo] = useRecoilState(makePostState);

  const onChangeTextHandler = (text: string) => {
    setMakePostInfo(prev => ({ ...prev, contents: text }));
  };

  return (
    <View style={styles.wrap}>
      <TextInput
        style={styles.textInput}
        multiline
        placeholder="내용을 입력해요..."
        onChangeText={onChangeTextHandler}
        value={makePostInfo.contents}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingVertical: 10,
  },
  textInput: {
    width: '100%',
    minHeight: 50,
    fontSize: Size.normalMiddle,
  },
});