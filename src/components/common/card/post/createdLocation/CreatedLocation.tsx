import { useNavigationState } from '@react-navigation/native';
import { Text, View } from 'react-native';

interface Props {
  ownerSubLocality: string;
}

export default function CreatedLocation({ ownerSubLocality }: Props) {
  const navigationState = useNavigationState(state => state);

  const isPostsSearchScreen = navigationState.routes[navigationState.index].name === 'PostsSearchScreen' ? true : false;

  return (
    <>
      {isPostsSearchScreen && (
        <View>
          <Text>{ownerSubLocality}</Text>
        </View>
      )}
    </>
  );
}
