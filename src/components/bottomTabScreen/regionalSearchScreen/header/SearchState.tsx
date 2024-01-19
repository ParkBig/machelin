import Button from 'components/common/layout/Button';
import useUsersSubLocalityQuery from 'query/hooks/users/useUsersSubLocalityQuery';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { regionalSearchState } from 'store/searchState';

interface Props {
  toggleModalHandler: () => void;
}

export default function SearchState({ toggleModalHandler }: Props) {
  const { mySubLocality } = useUsersSubLocalityQuery();
  const [regionalSearch, setRegionalSearch] = useRecoilState(regionalSearchState);

  useEffect(() => {
    if (!mySubLocality) {
      return;
    }

    setRegionalSearch(mySubLocality.localityArr.slice(1).join(' '));
  }, [mySubLocality]);

  return (
    <Button style={styles.wrap} onPress={toggleModalHandler}>
      <Text style={styles.text}>{regionalSearch}</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    minHeight: 60,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    fontWeight: 'bold',
  }
});
