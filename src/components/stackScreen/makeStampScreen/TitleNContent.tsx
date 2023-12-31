import { Colors, Size } from 'const/global-styles';
import { StyleSheet, TextInput, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { makeStampState } from 'store/makeStampState';

export default function TitleNContent() {
  const [makeStampValues, setMakeStampValues] = useRecoilState(makeStampState);

  const onChangeTextHandler = (which: 'title' | 'content', text: string) => {
    setMakeStampValues(prev => ({ ...prev, [which]: text }));
  };

  return (
    <View style={styles.wrap}>
      <TextInput
        style={styles.textInput}
        placeholder="제목 (필수)"
        value={makeStampValues.title}
        onChangeText={onChangeTextHandler.bind(null, 'title')}
      />
      <TextInput
        style={styles.textInput}
        multiline
        placeholder="내용"
        value={makeStampValues.content}
        onChangeText={onChangeTextHandler.bind(null, 'content')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingVertical: 10,
    gap: 10,
  },
  textInput: {
    width: '100%',
    minHeight: 60,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.mainGreen2,
    fontSize: Size.normalBig,
  },
});
