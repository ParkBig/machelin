import ChoseRestaurant from 'components/stackScreen/makePostScreen/choseRestaurant/ChoseRestaurant';
import PostContents from 'components/stackScreen/makePostScreen/contents/PostContents';
import Hashtag from 'components/stackScreen/makePostScreen/hashtag/Hashtag';
import SelectPublic from 'components/stackScreen/makePostScreen/selectPublic/SelectPublic';
import StarScore from 'components/stackScreen/makePostScreen/starScore/StarScore';
import WriterImg from 'components/stackScreen/makePostScreen/writerImg/WriterImg';
import { Colors } from 'const/global-styles';
import { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useResetRecoilState } from 'recoil';
import { makePostState } from 'store/makePostState';
import { StackScreenPropsAbout } from 'types/screenType';

export default function MakePostScreen({ route }: StackScreenPropsAbout<'MakePostScreen'>) {
  const resetMakePostState = useResetRecoilState(makePostState);

  useEffect(() => {
    resetMakePostState();
  }, []);

  return (
    <ScrollView style={styles.wrap} showsVerticalScrollIndicator={false}>
      <ChoseRestaurant />
      <WriterImg />
      <PostContents />
      {/* will update */}
      {/* <Hashtag /> */}
      {route.params.restaurantInfo && <StarScore />}
      <SelectPublic />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.mainWhite1,
    paddingHorizontal: 15,
  },
});
