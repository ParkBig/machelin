import { Colors, Size } from 'const/global-styles';
import { StyleSheet, TextInput, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { makePostState } from 'store/makePostState';

export default function Hashtag() {
  const [makePostInfo, setMakePostInfo] = useRecoilState(makePostState);

  const onChangeTextHandler = (text: string) => {
    setMakePostInfo(prev => ({ ...prev, hashtags: text }));
  };

  return (
    <View style={styles.wrap}>
      <TextInput
        multiline
        style={styles.textInput}
        value={makePostInfo.hashtags}
        onChangeText={onChangeTextHandler}
        placeholder="#해쉬태그"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 50,
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.mainGreen1,
    borderBottomWidth: 1.5,
  },
  textInput: {
    width: '100%',
    minHeight: 50,
    fontSize: Size.normalMiddle,
  },
});
