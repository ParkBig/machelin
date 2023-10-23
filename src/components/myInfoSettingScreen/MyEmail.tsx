import Button from "components/common/Button";
import useMyInfoQuery from "query/hooks/useMyInfoQuery";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { UseNavigation } from "types/screen/screenType";

export default function MyEmail() {
  const { navigate } = useNavigation<UseNavigation<'MyInfoSettingScreen'>>();
  const { myInfo } = useMyInfoQuery();

  const navigateToChangeEmailHandler = () => {
    navigate('InstanceModifyMyInfoScreen', {
      modifyType: '이메일 변경',
    });
  };
  
  return (
    <View style={styles.wrap}>
      <Text style={styles.titleText}>이메일</Text>
      <Button style={styles.button} onPress={navigateToChangeEmailHandler}>
        <Text>{myInfo?.authUser?.email}</Text>
        <Ionicons name='chevron-forward-outline' size={20} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    alignItems:'center',
    opacity: 0.7,
    gap: 5,
  }
});
