import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { Colors, Size } from 'const/global-styles';
import { getCurrentPositionAsync } from 'expo-location';
import mime from 'mime';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import useUsersPostsQuery from 'query/hooks/users/useUsersPostsQuery';
import { makePostQuery } from 'query/posts';
import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { myLocationState } from 'store/locationState';
import { makePostState } from 'store/makePostState';
import { GooglePlace } from 'types/types';
import { UseNavigation } from 'types/screenType';

interface Props {
  restaurantInfo: GooglePlace | null;
}

export default function MakePostButton({ restaurantInfo }: Props) {
  const { goBack } = useNavigation<UseNavigation<'MakePostScreen'>>();
  const queryClient = useQueryClient();
  const { myInfo, reMyInfo } = useMyInfoQuery();
  const { rePosts } = useUsersPostsQuery(myInfo?.authUser?.id);
  const makePostInfo = useRecoilValue(makePostState);
  const [myLocation, setMyLocation] = useRecoilState(myLocationState);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const { mutate } = useMutation(makePostQuery, {
    onSuccess: res => {
      if (res.ok) {
        reMyInfo();
        rePosts();
        queryClient.invalidateQueries('neighborhoodPosts');
        if (restaurantInfo?.place_id) {
          queryClient.invalidateQueries('restaurantPosts');
        }
        goBack();
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
    if (restaurantInfo && makePostInfo.rating === 0) {
      setToggleAlertModal({ toggle: true, alertMsg: '점수를 1점이상 평가해주세요' });
      return;
    }

    const payloadFormData = new FormData();
    payloadFormData.append('contents', makePostInfo.contents);
    payloadFormData.append('isPublic', String(makePostInfo.isPublic));
    payloadFormData.append('rating', String(makePostInfo.rating));
    payloadFormData.append('hashtags', makePostInfo.hashtags);
    payloadFormData.append('userLat', String(myLocation.latitude));
    payloadFormData.append('userLng', String(myLocation.longitude));

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

    if (restaurantInfo) {
      payloadFormData.append('hasRestaurantTag', 'true');
      payloadFormData.append('restaurantLat', String(restaurantInfo.geometry.location.lat));
      payloadFormData.append('restaurantLng', String(restaurantInfo.geometry.location.lng));
      payloadFormData.append('restaurantId', restaurantInfo.place_id);
      payloadFormData.append('restaurantName', restaurantInfo.name);
      payloadFormData.append('restaurantAddress', restaurantInfo.formatted_address);
    }

    mutate(payloadFormData);
  };

  useEffect(() => {
    const checkHasMyLocation = async () => {
      const getMyLocation = await getCurrentPositionAsync();

      setMyLocation({
        isGetLocation: true,
        latitude: getMyLocation.coords.latitude,
        longitude: getMyLocation.coords.longitude,
      });
    };

    checkHasMyLocation();
  }, []);

  return (
    <>
      <Button onPress={makePostHandler}>
        <Text style={styles.text}>완료</Text>
      </Button>
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: Size.normalBig,
    color: Colors.mainWhite3,
    fontWeight: 'bold',
  },
});