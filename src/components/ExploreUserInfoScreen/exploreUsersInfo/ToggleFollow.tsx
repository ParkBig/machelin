import { toggleFriendStateQuery } from 'query/user';
import { StyleSheet, Text, View } from 'react-native';
import { useMutation } from 'react-query';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'const/global-styles';
import Button from 'components/common/Button';
import useUsersFollowsQuery from 'query/hooks/users/useUsersFollowsQuery';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { useState } from 'react';
import ConfirmAlertModal, { ToggleState } from 'components/common/ConfirmAlertModal';

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
    mutate({ exploreUserId });
  };

  const isMyFollow = follows?.follows?.find(follow => +follow.id === exploreUserId);

  return (
    <>
      <View style={styles.wrap}>
        <Button style={styles.button} onPress={toggleFriendStateQueryHandler}>
          <Ionicons
            name={
              myInfo && +myInfo.authUser.id === exploreUserId ? undefined : isMyFollow ? 'person' : 'person-add-outline'
            }
            size={20}
            color={Colors.mainWhite3}
          />
          {!isMyFollow && <Text style={styles.text}>팔로우</Text>}
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
