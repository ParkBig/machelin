import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import Line from 'components/common/layout/Line';
import { Colors } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { Image, StyleSheet, Text, View } from 'react-native';
import { UseNavigation } from 'types/screenType';
import { Comment, PostNavigation } from 'types/types';
import { getPreviousDate } from 'util/dateTranslator';

interface Props {
  comment: Comment;
}

export default function PostComment({ comment }: Props) {
  const { navigate } = useNavigation<UseNavigation<PostNavigation>>();
  const { myInfo } = useMyInfoQuery();
  const timeAgo = getPreviousDate(comment.createdAt);

  const goToUsersScreenHandler = () => {
    if (comment.owner.id === myInfo?.authUser?.id) {
      navigate('MyScreen');
      return;
    } else {
      navigate('ExploreUserInfoScreen', {
        userId: comment.owner.id,
      });
    }
  };

  const imageSource = comment.owner.pfp ? { uri: comment.owner.pfp } : require('assets/png/user.png');

  return (
    <View style={styles.wrap}>
      <Button style={styles.imgWrap} onPress={goToUsersScreenHandler}>
        <Image style={styles.img} source={imageSource} />
      </Button>
      <View style={styles.userNameNComment}>
        <Button style={styles.userInfo} onPress={goToUsersScreenHandler}>
          <Text style={styles.userNameText}>{comment.owner.nickname}</Text>
          <Line style={styles.dot} />
          <Text style={styles.timeAgoText}>{timeAgo}</Text>
        </Button>
        <View style={styles.commentWrap}>
          <Text>{comment.comment}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    minHeight: 40,
    flexDirection: 'row',
    paddingVertical: 8,
  },
  imgWrap: {
    width: 40,
    alignItems: 'center',
  },
  img: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNameNComment: {
    flex: 1,
    gap: 5,
  },
  userInfo: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dot: {
    height: 7,
    width: 7,
    backgroundColor: Colors.mainGreen1,
  },
  userNameText: {
    fontWeight: 'bold',
  },
  timeAgoText: {
    color: Colors.darkGray,
  },
  commentWrap: {
    width: '100%',
    justifyContent: 'center',
    paddingRight: 7.5,
  },
});
