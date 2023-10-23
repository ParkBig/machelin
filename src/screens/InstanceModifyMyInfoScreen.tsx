import Button from 'components/common/Button';
import { Colors, Shadow, Size } from 'const/global-styles';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { StackScreenPropsAbout } from 'types/screen/screenType';

export default function InstanceModifyMyInfoScreen({ route }: StackScreenPropsAbout<'InstanceModifyMyInfoScreen'>) {
  const modifyType = route.params.modifyType;
  const placeholder = modifyType === '닉네임 변경' ? '닉네임 입력(10자 이내)' : '이메일 입력';

  const changeQueryHandler = () => {}

  return (
    <View style={styles.wrap}>
      <TextInput style={styles.textInput} placeholder={placeholder} />
      <Button style={styles.button} onPress={changeQueryHandler}>
        <Text style={styles.text}>{modifyType}</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: Colors.mainWhite1,
    gap: 15,
  },
  textInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: Colors.lightGray,
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.mainGreen1,
    ...Shadow,
  },
  text: {
    color: Colors.mainBlue1,
    fontSize: Size.normalBig,
    fontWeight: 'bold',
  },
});
