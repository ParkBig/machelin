import { useRecoilValue } from 'recoil';
import { makeStampState } from 'store/makeStampState';
import HasImg from './HasImg';
import GetImg from './GetImg';

export default function WriterImg() {
  const { images } = useRecoilValue(makeStampState);

  return <>{images.length ? <HasImg /> : <GetImg />}</>;
}
