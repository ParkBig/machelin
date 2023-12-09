import Button from 'components/common/layout/Button';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Size } from 'const/global-styles';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { makePostState } from 'store/makePostState';
import PublicSettingModal from './PublicSettingModal';
import Line from 'components/common/layout/Line';

export default function SelectPublic() {
  const makePostInfo = useRecoilValue(makePostState);
  const [togglePublicModal, setTogglePublicModal] = useState(false);

  const toggleModal = () => {
    setTogglePublicModal(prev => !prev);
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.title}>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>공개범위</Text>
        <Line style={styles.line} />
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
    height: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
    borderBottomColor: Colors.mainGreen1,
    borderBottomWidth: 1.5,
  },
  title: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  line: {
    width: 2,
    height: '50%',
    backgroundColor: Colors.mainGreen2
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    opacity: 0.7,
    gap: 5,
  },
  text: {
    fontSize: Size.normalSmallMiddle,
  },
});
