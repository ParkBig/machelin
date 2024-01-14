import { View } from 'react-native';
import LongContents from './LongContents';
import BriefContents from './BriefContents';
import { PostType } from 'types/types';

interface Props {
  contents: string;
  postType: PostType;
}

export default function Content({ contents, postType }: Props) {
  const justPost = postType === 'POST' ? true : false;

  return (
    <View>
      {justPost ? (
        contents.length > 100 ? (
          <LongContents contents={contents} />
        ) : (
          <BriefContents contents={contents} />
        )
      ) : (
        <BriefContents contents={contents} />
      )}
    </View>
  );
}
