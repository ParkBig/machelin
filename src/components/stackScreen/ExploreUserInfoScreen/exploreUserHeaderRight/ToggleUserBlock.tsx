import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import { Colors } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import useMyBlockedUsersQuery from 'query/hooks/users/useMyBlockedUsersQuery';
import { useMutation } from 'react-query';
import { toggleUserBlockQuery } from 'query/api/user';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import useUsersFollowsQuery from 'query/hooks/users/useUsersFollowsQuery';

interface Props {
  exploreUserId: number;
}

export default function ToggleUserBlock({ exploreUserId }: Props) {
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });
  const { myInfo } = useMyInfoQuery();
  const { reFollows } = useUsersFollowsQuery();
  const { myBlockedUsers, reMyBlockedUsers } = useMyBlockedUsersQuery();

  const isBlocked = myBlockedUsers?.myBlockedUsers.some(blockedUser => blockedUser.blockedUserId === exploreUserId);

  const { mutate, isLoading } = useMutation(toggleUserBlockQuery, {
    onSuccess: res => {
      if (res.ok) {
        reFollows();
        reMyBlockedUsers();
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

    if (!myInfo?.authUser) {
      setToggleAlertModal({ toggle: true, alertMsg: '로그인 후 이용가능합니다.' });
      return;
    }

    mutate({ userId: exploreUserId });
  };

  return (
    <>
      <View style={styles.wrap}>
        {isLoading ? (
          <LoadingOverlay style={styles.loadingOverlay} />
        ) : (
          <Button style={styles.button} onPress={toggleFriendStateQueryHandler}>
            <Ionicons
              name={isBlocked ? 'person-remove' : 'person-remove-outline'}
              size={20}
              color={Colors.googleBackground}
            />
          </Button>
        )}
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
  },
  button: {
    padding: 10,
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
  loadingOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
