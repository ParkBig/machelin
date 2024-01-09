import Button from 'components/common/layout/Button';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'react-query';
import { Colors, Size } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { useState } from 'react';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import useUsersPostLikesDislikesQuery from 'query/hooks/users/useUsersPostLikesDislikesQuery';
import { Like } from 'types/types';
import { togglePostLikeDislike } from 'query/api/posts';

interface Props {
  postId: number;
  postsLikes: Like[];
}

export default function Hearts({ postId, postsLikes }: Props) {
  const { myInfo } = useMyInfoQuery();
  const [likesCount, setLikesCount] = useState(postsLikes.length);
  const { usersPostLikesDislikes, reUsersPostLikesDislikes } = useUsersPostLikesDislikesQuery();
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const isHeart = usersPostLikesDislikes?.usersLikes?.find(like => like.post.id === postId);
  const isHeartBroken = usersPostLikesDislikes?.usersDislikes?.find(dislike => dislike.post.id === postId);

  const { mutate } = useMutation(togglePostLikeDislike, {
    onSuccess: res => {
      if (res.ok) {
        reUsersPostLikesDislikes();
      } else {
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
    onError: () => {
      setToggleAlertModal({ toggle: true, alertMsg: '서버가 잠시 아픈거 같아요...' });
    },
  });

  const togglePostLikeDislikeHandler = (which: 'like' | 'dislike') => {
    if (!myInfo?.authUser) {
      setToggleAlertModal({ toggle: true, alertMsg: '로그인후 이용가능합니다' });
      return;
    }

    if (which === 'like') {
      if (isHeart) {
        setLikesCount(prev => prev - 1);
      } else {
        setLikesCount(prev => prev + 1);
      }
    } else {
      if (isHeart) {
        setLikesCount(prev => prev - 1);
      }
    }

    mutate({ postId, which });
  };

  return (
    <>
      <View style={styles.likes}>
        <Button style={styles.like} onPress={togglePostLikeDislikeHandler.bind(null, 'like')}>
          <Ionicons name={isHeart ? 'heart' : 'heart-outline'} size={Size.bigBig} color={Colors.mainGreen1} />
          {likesCount !== 0 && <Text style={styles.text}>{likesCount}</Text>}
        </Button>
        <Button onPress={togglePostLikeDislikeHandler.bind(null, 'dislike')}>
          <Ionicons
            name={isHeartBroken ? 'heart-dislike' : 'heart-dislike-outline'}
            size={Size.bigBig}
            color={Colors.mainGreen1}
          />
        </Button>
      </View>
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </>
  );
}

const styles = StyleSheet.create({
  likes: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  like: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    color: Colors.gray,
  },
});
