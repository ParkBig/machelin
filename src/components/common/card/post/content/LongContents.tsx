import Button from 'components/common/layout/Button';
import { Colors, Size } from 'const/global-styles';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  contents: string;
}

export default function LongContents({ contents }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => {
    setIsOpen(true);
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.contentsText}>
        {isOpen ? (
          contents
        ) : (
          <>
            {contents.slice(0, 50)}
            <Button style={styles.button} onPress={openHandler}>
              <Text style={styles.showMoreText}>... 더보기</Text>
            </Button>
          </>
        )}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 20,
  },
  contentsText: {
    fontSize: Size.normalMiddle,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  showMoreText: {
    fontSize: Size.normalSmall,
    color: Colors.gray,
  },
});
