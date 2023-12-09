import { toggleFriendStateQuery } from 'query/user';
import { StyleSheet, Text, View } from 'react-native';
import { useMutation } from 'react-query';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'const/global-styles';
import Button from 'components/common/layout/Button';
import useUsersFollowsQuery from 'query/hooks/users/useUsersFollowsQuery';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { useState } from 'react';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';

interface Props {
  exploreUserId: number;
}

export default function ToggleFollow({ exploreUserId }: Props) {
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });
  const { myInfo, reMyInfo } = useMyInfoQuery();
  const { follows, reFollows } = useUsersFollowsQuery(myInfo?.authUser.id);
  const { mutate } = useMutation(toggleFriendStateQuery, {
    onSuccess: res => {
      if (res.ok) {
        reMyInfo();
        reFollows();
      } else {
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
    onError: () => {
      setToggleAlertModal({ toggle: true, alertMsg: '서버가 잠시 아픈거 같아요...' });
    },
  });

  const toggleFriendStateQueryHandler = () => {
    if (myInfo?.authUser && myInfo.authUser.id === exploreUserId) {
      return;
    }

    mutate({ exploreUserId });
  };

  const isMyFollow = follows?.follows?.find(follow => +follow.id === exploreUserId);
  const iconName = myInfo?.authUser
    ? myInfo.authUser.id === exploreUserId
      ? 'body'
      : isMyFollow
      ? 'person'
      : 'person-add-outline'
    : 'person-add-outline';

  return (
    <>
      <View style={styles.wrap}>
        <Button style={styles.button} onPress={toggleFriendStateQueryHandler}>
          <Ionicons name={iconName} size={20} color={Colors.mainWhite3} />
          {iconName === 'person' ? null : <Text style={styles.text}>{iconName === 'body' ? 'Me' : '팔로우'}</Text>}
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
  wrap: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.mainGreen1,
    gap: 10,
  },
  text: {
    color: Colors.mainWhite3,
    fontWeight: 'bold',
  },
});
