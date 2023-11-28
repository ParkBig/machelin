import Button from 'components/common/Button';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'react-query';
import { Colors, Size } from 'const/global-styles';
import { Like } from 'types/store/myInfoType';
import { togglePostLikeDislike } from 'query/posts';
import useUsersPostsQuery from 'query/hooks/users/useUsersPostsQuery';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { useState } from 'react';
import ConfirmAlertModal, { ToggleState } from 'components/common/ConfirmAlertModal';

interface Props {
  postId: number;
  postsLikes: Like[];
  usersLikes: Like[];
  usersDislikes: Like[];
}

export default function Hearts({ postId, postsLikes, usersLikes, usersDislikes }: Props) {
  const { myInfo, reMyInfo } = useMyInfoQuery();
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });
  const { rePosts } = useUsersPostsQuery(myInfo?.authUser?.id);
  const { mutate } = useMutation(togglePostLikeDislike, {
    onSuccess: res => {
      if (res.ok) {
        reMyInfo();
        rePosts();
      } else {
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
    onError: () => {
      setToggleAlertModal({ toggle: true, alertMsg: '서버가 잠시 아픈거 같아요...' });
    },
  });

  const togglePostLikeDislikeHandler = (which: 'like' | 'dislike') => {
    mutate({ postId, which });
  };

  const isHeart = usersLikes.find(like => like.post.id === postId);
  const isHeartBroken = usersDislikes.find(dislike => dislike.post.id === postId);
  const likesCount = postsLikes.length;

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
