import ConfirmAlertModal, { ToggleState } from 'components/common/ConfirmAlertModal';
import { DEFAULT_IMAGE } from 'const/default';
import { Colors } from 'const/global-styles';
import { makeCommentQuery } from 'query/comments';
import usePostsCommentsQuery from 'query/hooks/posts/usePostsCommentsQuery';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { useState } from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import { useMutation } from 'react-query';

interface Props {
  postId: number;
}

export default function LeaveAComment({ postId }: Props) {
  const [comment, setComment] = useState('');
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });
  const { myInfo } = useMyInfoQuery();
  const { reComments } = usePostsCommentsQuery(postId);
  const { mutate } = useMutation(makeCommentQuery, {
    onSuccess: res => {
      if (res.ok) {
        reComments();
        setComment('');
      } else {
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
    onError: () => {
      setToggleAlertModal({ toggle: true, alertMsg: '서버가 잠시 아픈거 같아요...' });
    },
  });

  const onChangeText = (text: string) => {
    setComment(text);
  };

  const onSubmitEditingHandler = () => {
    if (!myInfo?.authUser) {
      setToggleAlertModal({ toggle: true, alertMsg: '로그인후 이용가능합니다' });
      return;
    }

    mutate({ postId, comment });
  };

  return (
    <>
      <View style={styles.wrap}>
        <View style={styles.writerImgWrap}>
          <Image
            style={styles.writerImg}
            source={myInfo?.authUser?.pfp ? { uri: myInfo?.authUser?.pfp } : require('assets/png/user.png')}
          />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="댓글 달기..."
          value={comment}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditingHandler}
        />
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
  wrap: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: Colors.mainGreen1,
    borderTopWidth: 2,
  },
  writerImgWrap: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  writerImg: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    paddingRight: 10,
  },
});
