import Line from 'components/common/Line';
import MyInfos from 'components/myListScreen/myInfo/MyInfos';
import MyList from 'components/myListScreen/myList/MyList';
import { Colors } from 'const/global-styles';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenPropsAbout } from 'types/screen/screenType';
import { useLayoutEffect } from 'react';
import Button from 'components/common/Button';

export default function MyListScreen({ navigation }: BottomTabScreenPropsAbout<'MyListScreen'>) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRight}>
          <Button>
            <Ionicons name="settings-outline" size={25} />
          </Button>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.wrap}>
      <MyInfos />
      <Line style={styles.line} />
      <MyList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    paddingRight: 10,
  },
  wrap: {
    backgroundColor: Colors.mainWhite1,
  },
  line: {
    width: '100%',
    height: 6,
    backgroundColor: Colors.mainGreen2,
    borderRadius: 30,
  },
});
