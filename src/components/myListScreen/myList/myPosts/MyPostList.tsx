import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import NoPost from "./NoPost";
import Button from "components/common/Button";
import { useNavigation } from "@react-navigation/native";
import { UseNavigation } from "types/screen/screenType";

export default function MyPostList() {
  const { navigate } = useNavigation<UseNavigation<'MyListScreen'>>();

  const goToMakePostHandler = () => {
    navigate('MachelinLankScreen');
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.title}>
        <Text>나의 게시글</Text>
        <Button onPress={goToMakePostHandler}>
          <Ionicons name='add-outline' size={25} />
        </Button>
      </View>
      <View style={styles.content}>
        <NoPost />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingHorizontal: 15,
  },
  title: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
