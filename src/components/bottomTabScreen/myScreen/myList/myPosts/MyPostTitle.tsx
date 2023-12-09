import Button from 'components/common/layout/Button';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Size } from 'const/global-styles';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screen/screenType';

export default function MyPostTitle() {
  const { navigate } = useNavigation<UseNavigation<'MyScreen'>>();

  const goToMakePostHandler = () => {
    navigate('MakePostScreen', {
      restaurantInfo: null,
    });
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.titleText}>나의 게시글</Text>
      <Button onPress={goToMakePostHandler}>
        <Ionicons name="add-outline" size={30} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
  },
  titleText: {
    fontSize: Size.normalMiddle,
    fontWeight: 'bold',
  },
});
