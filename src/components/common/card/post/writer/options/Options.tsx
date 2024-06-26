import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/layout/Button';
import { Colors } from 'const/global-styles';
import { useState } from 'react';
import OptionsModals from './optionsModals/OptionsModals';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';

interface Props {
  postId: number;
  ownerId: number;
  isPublic: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Options({ postId, ownerId, isPublic, setIsVisible }: Props) {
  const { myInfo } = useMyInfoQuery();
  const [toggleReportModal, setToggleReportModal] = useState(false);
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const toggleReportModalHandler = () => {
    if (!myInfo?.authUser) {
      setToggleAlertModal({ toggle: true, alertMsg: '로그인 후 이용가능합니다' });
      return;
    }

    setToggleReportModal(prev => !prev);
  };

  return (
    <>
      <Button onPress={toggleReportModalHandler}>
        <Ionicons name="ellipsis-vertical" size={20} color={Colors.gray} />
      </Button>
      <OptionsModals
        setIsVisible={setIsVisible}
        postId={postId}
        ownerId={ownerId}
        isPublic={isPublic}
        toggleModal={toggleReportModal}
        toggleModalHandler={toggleReportModalHandler}
      />
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </>
  );
}
