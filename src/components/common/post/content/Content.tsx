import { View } from 'react-native';
import LongContents from './LongContents';
import BriefContents from './BriefContents';

interface Props {
  contents: string;
}

export default function Content({ contents }: Props) {
  return (
    <View>
      {contents.length > 50 ? (
        <LongContents contents={contents} />
      ) : (
        <BriefContents contents={contents} />
      )}
    </View>
  );
}
