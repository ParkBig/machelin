import { useRoute } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import UserImageModal from 'components/common/modal/UserImageModal';
import { Colors } from 'const/global-styles';
import useExploreUserQuery from 'query/hooks/exploreUsers/useExploreUserQuery';
import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { UseRouter } from 'types/screenType';

export default function BriefExploreUsersInfo() {
  const { params } = useRoute<UseRouter<'ExploreUserInfoScreen'>>();
  const { exploreUser } = useExploreUserQuery(params.userId);
  const [toggleImageModal, setToggleImageModal] = useState(false);

  const toggleImageModalHandler = () => {
    setToggleImageModal(prev => !prev);
  };

  const imageSource = exploreUser?.exploreUser?.pfp
    ? { uri: exploreUser?.exploreUser?.pfp }
    : require('assets/png/user.png');

  return (
    <View style={styles.wrap}>
      <Button style={styles.php} onPress={toggleImageModalHandler}>
        <Image style={styles.image} source={imageSource} />
        {toggleImageModal && (
          <UserImageModal
            imageSource={imageSource}
            toggleModal={toggleImageModal}
            toggleModalHandler={toggleImageModalHandler}
          />
        )}
      </Button>
      <View style={styles.infos}>
        <View>
          <Text style={styles.nickname}>{exploreUser?.exploreUser.nickname}</Text>
        </View>
        <View>
          <Text style={styles.loginId}>{exploreUser?.exploreUser.loginId}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  php: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  infos: {
    flex: 1,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  nickname: {
    fontSize: 25,
  },
  loginId: {
    fontSize: 15,
    color: Colors.gray,
  },
});
