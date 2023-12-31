import Button from 'components/common/layout/Button';
import { Size } from 'const/global-styles';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { WhichOneSelectedState } from './OptionsModals';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'react-query';
import { deletePostQuery } from 'query/posts';
import useUsersPostsQuery from 'query/hooks/users/useUsersPostsQuery';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';

interface Props {
  postId: number;
  setWhichOneSelected: React.Dispatch<React.SetStateAction<WhichOneSelectedState>>;
  toggleModalHandler: () => void;
}

export default function Delete({ postId, setWhichOneSelected, toggleModalHandler }: Props) {
  const { rePosts } = useUsersPostsQuery();
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const { mutate, isLoading } = useMutation(deletePostQuery, {
    onSuccess: res => {
      if (res.ok) {
        rePosts();
        toggleModalHandler();
      } else {
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
    onError: () => {
      setToggleAlertModal({ toggle: true, alertMsg: '서버가 잠시 아픈거 같아요...' });
    },
  });

  const closeSelectedHandler = () => {
    setWhichOneSelected(null);
  };

  const deleteHandler = () => {
    mutate(postId);
  };

  return (
    <>
      <View style={styles.title}>
        <Ionicons name="trash" size={Size.bigMiddle} />
        <Text style={styles.titleText}>정말 삭제하시겠습니까?</Text>
      </View>
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={closeSelectedHandler}>
          <Text style={styles.buttonText}>아니요</Text>
        </Button>
        <Button style={styles.button} onPress={deleteHandler}>
          <Text style={styles.buttonText}>네</Text>
        </Button>
      </View>
      {isLoading && <LoadingOverlay style={styles.loadingOverlay} />}
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buttons: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: Size.normalMiddle,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: Size.normalMiddle,
  },
  loadingOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
