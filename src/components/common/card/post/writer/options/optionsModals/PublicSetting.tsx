import Button from 'components/common/layout/Button';
import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { WhichOneSelectedState } from './OptionsModals';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'react-query';
import useUsersPostsQuery from 'query/hooks/users/useUsersPostsQuery';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import { modifyPostPublicStateQuery } from 'query/api/posts';

interface Props {
  postId: number;
  isPublic: boolean;
  setWhichOneSelected: React.Dispatch<React.SetStateAction<WhichOneSelectedState>>;
  toggleModalHandler: () => void;
}

export default function PublicSetting({ postId, isPublic, setWhichOneSelected, toggleModalHandler }: Props) {
  const { rePosts } = useUsersPostsQuery();
  const [publicOrNot, setPublicOrNot] = useState(isPublic);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const { mutate, isLoading } = useMutation(modifyPostPublicStateQuery, {
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

  const changePublicHandler = (isPublic: boolean) => {
    setPublicOrNot(isPublic);
  };

  const closeSelectedHandler = () => {
    setWhichOneSelected(null);
  };

  const confirmHandler = () => {
    if (isPublic === publicOrNot) {
      setToggleAlertModal({ toggle: true, alertMsg: `이미 ${publicOrNot ? '전체공개' : '나만보기'}입니다` });
      return;
    }

    mutate({ id: postId, isPublic: publicOrNot });
  };

  return (
    <>
      <View style={styles.title}>
        <Ionicons name="lock-open" size={Size.bigMiddle} />
        <Text style={styles.titleText}>공개범위 설정</Text>
      </View>
      <Button style={styles.option} onPress={changePublicHandler.bind(null, true)}>
        <Text style={styles.text}>전체공개</Text>
        {publicOrNot && <Ionicons name="checkmark-sharp" size={Size.bigMiddle} />}
      </Button>
      <Button style={styles.option} onPress={changePublicHandler.bind(null, false)}>
        <Text style={styles.text}>나만보기</Text>
        {!publicOrNot && <Ionicons name="checkmark-sharp" size={Size.bigMiddle} />}
      </Button>
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={closeSelectedHandler}>
          <Text style={styles.text}>취소</Text>
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          <Text style={styles.text}>확인</Text>
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
  option: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttons: {
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
  text: {
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
