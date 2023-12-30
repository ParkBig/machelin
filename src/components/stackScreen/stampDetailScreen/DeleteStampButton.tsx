import { useNavigation, useRoute } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import ConfirmAlertModal, { ToggleState } from 'components/common/modal/ConfirmAlertModal';
import YesOrNoModal from 'components/common/modal/YesOrNoModal';
import { Colors, Size } from 'const/global-styles';
import useUsersStampsQuery from 'query/hooks/users/useUsersStampsQuery';
import { deleteStampQuery } from 'query/stamps';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useMutation } from 'react-query';
import { UseNavigation, UseRouter } from 'types/screenType';
import { Ionicons } from '@expo/vector-icons';

export default function DeleteStampButton() {
  const { params } = useRoute<UseRouter<'StampDetailScreen'>>();
  const { goBack } = useNavigation<UseNavigation<'MakeStampScreen'>>();
  const { reStamps } = useUsersStampsQuery();
  const [toggleAlertModal, setToggleAlertModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });
  const [toggleYesOrNoModal, setToggleYesOrNoModal] = useState<ToggleState>({ toggle: false, alertMsg: '' });

  const { mutate } = useMutation(deleteStampQuery, {
    onSuccess: res => {
      if (res.ok) {
        reStamps();
        goBack();
      } else {
        setToggleAlertModal({ toggle: true, alertMsg: res.msg });
      }
    },
  });

  const deleteStampHandler = () => {
    setToggleYesOrNoModal({ toggle: true, alertMsg: '정말 삭제하시겠습니까?' });
  };

  return (
    <Button style={styles.wrap} onPress={deleteStampHandler}>
      <Ionicons name='trash' size={30} color={Colors.mainWhite3} />
      <YesOrNoModal
        toggleModal={toggleYesOrNoModal.toggle}
        setToggleAlertModal={setToggleYesOrNoModal}
        alertMsg={toggleYesOrNoModal.alertMsg}
        mutate={mutate}
        argument={params.stamp.id}
      />
      <ConfirmAlertModal
        toggleModal={toggleAlertModal.toggle}
        setToggleAlertModal={setToggleAlertModal}
        alertMsg={toggleAlertModal.alertMsg}
      />
    </Button>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 10,
  },
});