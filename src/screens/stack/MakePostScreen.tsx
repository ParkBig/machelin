import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import ChoseRestaurant from 'components/stackScreen/makePostScreen/choseRestaurant/ChoseRestaurant';
import PostContents from 'components/stackScreen/makePostScreen/contents/PostContents';
import Hashtag from 'components/stackScreen/makePostScreen/hashtag/Hashtag';
import SelectPublic from 'components/stackScreen/makePostScreen/selectPublic/SelectPublic';
import StarScore from 'components/stackScreen/makePostScreen/starScore/StarScore';
import WriterImg from 'components/stackScreen/makePostScreen/writerImg/WriterImg';
import { Colors, Size } from 'const/global-styles';
import { makePostQuery } from 'query/posts';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useMutation } from 'react-query';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { makePostState } from 'store/makePostState';
import { StackScreenPropsAbout } from 'types/screen/screenType';
import mime from 'mime';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import useUsersPostsQuery from 'query/hooks/users/useUsersPostsQuery';

export default function MakePostScreen({ navigation, route }: StackScreenPropsAbout<'MakePostScreen'>) {
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });
  const makePostInfo = useRecoilValue(makePostState);
  const resetMakePostState = useResetRecoilState(makePostState);
  const { myInfo, reMyInfo } = useMyInfoQuery();
  const { rePosts } = useUsersPostsQuery(myInfo?.authUser.id);
  const { mutate } = useMutation(makePostQuery, {
    onSuccess: res => {
      if (res.ok) {
        reMyInfo();
        rePosts();
        navigation.goBack();
      } else {
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
    onError: () => {
      setToggleAlertModal({ toggle: true, alertMsg: '서버가 잠시 아픈거 같아요...' });
    },
  });

  const makePostHandler = async () => {
    if (makePostInfo.contents.length < 1) {
      setToggleAlertModal({ toggle: true, alertMsg: '내용을 1글자 이상 적어주세요' });
      return;
    }
    if (route.params.restaurantInfo && makePostInfo.rating === 0) {
      setToggleAlertModal({ toggle: true, alertMsg: '점수를 1점이상 평가해주세요' });
      return;
    }

    const payloadFormData = new FormData();
    payloadFormData.append('contents', makePostInfo.contents);
    payloadFormData.append('isPublic', String(makePostInfo.isPublic));
    payloadFormData.append('rating', String(makePostInfo.rating));
    payloadFormData.append('hashtags', makePostInfo.hashtags);

    if (makePostInfo.images.length) {
      const now = Date.now();
      for (let i = 0; i < makePostInfo.images.length; i++) {
        /** 2번 인자에 sting아니면blob이라는데 blob형식으로 암만 보내도 네트워크 에러뜸 2틀동안 고생...  */
        //@ts-ignore
        payloadFormData.append('images', {
          uri: makePostInfo.images[i],
          type: mime.getType(makePostInfo.images[i]),
          name: `user${myInfo?.authUser.id}_postImage${now}_${i + 1}`,
        });
      }
    }

    if (route.params.restaurantInfo) {
      payloadFormData.append('hasRestaurantTag', 'true');
      payloadFormData.append('restaurantLat', String(route.params.restaurantInfo.geometry.location.lat));
      payloadFormData.append('restaurantLng', String(route.params.restaurantInfo.geometry.location.lng))
      payloadFormData.append('restaurantId', route.params.restaurantInfo.place_id);
      payloadFormData.append('restaurantName', route.params.restaurantInfo.name);
      payloadFormData.append('restaurantAddress', route.params.restaurantInfo.formatted_address);
    }

    mutate(payloadFormData);
  };

  useEffect(() => {
    resetMakePostState();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={makePostHandler}>
          <Text style={styles.text}>완료</Text>
        </Button>
      ),
    });
  }, [navigation, makePostHandler]);

  return (
    <ScrollView style={styles.wrap}>
      <ChoseRestaurant />
      <WriterImg />
      <PostContents />
      <Hashtag />
      {route.params.restaurantInfo && <StarScore />}
      <SelectPublic />
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.mainWhite1,
    paddingHorizontal: 15,
  },
  text: {
    fontSize: Size.normalBig,
    color: Colors.mainWhite3,
    fontWeight: 'bold',
  },
});
