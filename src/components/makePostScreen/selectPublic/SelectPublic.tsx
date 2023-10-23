import Button from 'components/common/Button';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Size } from 'const/global-styles';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { makePostState } from 'store/makePostState';
import PublicSettingModal from './PublicSettingModal';

export default function SelectPublic() {
  const [togglePublicModal, setTogglePublicModal] = useState(false);
  const [makePostInfo, setMakePostInfo] = useRecoilState(makePostState);

  const toggleModal = () => {
    setTogglePublicModal(prev => !prev);
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.title}>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>공개 범위</Text>
      </View>
      <View>
        <Button style={styles.button} onPress={toggleModal}>
          <Text style={styles.text}>{makePostInfo.isPublic ? '전체 공개' : '나만 보기'}</Text>
          <Ionicons name="chevron-forward-outline" size={Size.bigMiddle} />
        </Button>
      </View>
      <PublicSettingModal toggleModal={toggleModal} togglePublicModal={togglePublicModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  text: {
    fontSize: Size.normalBig,
  },
});
