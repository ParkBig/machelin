import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { Colors, Size } from 'const/global-styles';
import { getCurrentPositionAsync } from 'expo-location';
import mime from 'mime';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import useUsersPostsQuery from 'query/hooks/users/useUsersPostsQuery';
import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { myLocationState } from 'store/locationState';
import { makePostState } from 'store/makePostState';
import { GooglePlace } from 'types/types';
import { UseNavigation } from 'types/screenType';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import { makePostQuery } from 'query/api/posts';
import useUsersSubLocalityQuery from 'query/hooks/users/useUsersSubLocalityQuery';

interface Props {
  restaurantInfo: GooglePlace | null;
}

export default function MakePostButton({ restaurantInfo }: Props) {
  const { goBack } = useNavigation<UseNavigation<'MakePostScreen'>>();
  const queryClient = useQueryClient();
  const { myInfo, reMyInfo } = useMyInfoQuery();
  const { mySubLocality, reMySubLocality } = useUsersSubLocalityQuery();
  const { rePosts } = useUsersPostsQuery();
  const makePostInfo = useRecoilValue(makePostState);
  const setMyLocation = useSetRecoilState(myLocationState)
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const { mutate, isLoading } = useMutation(makePostQuery, {
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
      setToggleAlertModal({ toggle: true, alertMsg: '내용을 적어주세요' });
      return;
    }
    if (restaurantInfo && makePostInfo.rating === 0) {
      setToggleAlertModal({ toggle: true, alertMsg: '점수를 1점이상 평가해주세요' });
      return;
    }
    if (!mySubLocality || !mySubLocality.ok) {
      reMySubLocality();
      setToggleAlertModal({ toggle: true, alertMsg: '잠시 후 다시 시도해 주세요' });
      return;
    }

    const payloadFormData = new FormData();
    payloadFormData.append('contents', makePostInfo.contents);
    payloadFormData.append('isPublic', String(makePostInfo.isPublic));
    payloadFormData.append('rating', String(makePostInfo.rating));
    payloadFormData.append('hashtags', makePostInfo.hashtags);

    if (mySubLocality.isKorea) {
      payloadFormData.append('ownerSubLocality', mySubLocality.localityArr.join(' '));
    } else {
      payloadFormData.append('ownerSubLocality', mySubLocality.localityArr[0]);
    }

    if (makePostInfo.images.length) {
      const now = Date.now();
      for (let i = 0; i < makePostInfo.images.length; i++) {
        /** 2번 인자에 sting아니면blob이라는데 blob형식으로 암만 보내도 네트워크 에러뜸 2틀동안 고생...  */
        //@ts-ignore
        payloadFormData.append('images', {
          uri: makePostInfo.images[i],
          type: mime.getType(makePostInfo.images[i]),
          name: `user${myInfo?.authUser?.id}_postImage${now}_${i + 1}`,
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
      const latitude = getMyLocation.coords.latitude;
      const longitude = getMyLocation.coords.longitude;

      setMyLocation({
        isGetLocation: true,
        latitude,
        longitude,
      });
    };

    checkHasMyLocation();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingOverlay style={styles.loadingOverlay} size={30} color={Colors.mainWhite3} />
      ) : (
        <Button onPress={makePostHandler}>
          <Text style={styles.text}>완료</Text>
          <ConfirmAlertModal
            toggleModal={toggleAlertModal.toggle}
            setToggleAlertModal={setToggleAlertModal}
            alertMsg={toggleAlertModal.alertMsg}
          />
        </Button>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: Size.normalBig,
    color: Colors.mainWhite3,
    fontWeight: 'bold',
  },
  loadingOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
