import Button from 'components/common/Button';
import NoneRestaurant from 'components/makePostScreen/brief/NoneRestaurant';
import TargetRestaurant from 'components/makePostScreen/brief/TargetRestaurant';
import PostContents from 'components/makePostScreen/contents/PostContents';
import SelectPublic from 'components/makePostScreen/selectPublic/SelectPublic';
import StarScore from 'components/makePostScreen/starScore/StarScore';
import WriterImg from 'components/makePostScreen/writerImg/WriterImg';
import { Size } from 'const/global-styles';
import { restaurant } from 'data/mockRestaurant';
import { useLayoutEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackScreenPropsAbout } from 'types/screen/screenType';

export default function MakePostScreen({ navigation, route }: StackScreenPropsAbout<'MakePostScreen'>) {
  const mockData = restaurant;

  const makePostHandler = () => {};

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={makePostHandler}>
          <Text style={styles.text}>완료</Text>
        </Button>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView>
        <TargetRestaurant restaurantInfo={mockData} />
        <View style={styles.contents}>
          <WriterImg />
          <PostContents />
          <StarScore />
          <SelectPublic />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contents: {
    paddingHorizontal: 15,
  },
  text: {
    fontSize: Size.normalBig,
  },
});
