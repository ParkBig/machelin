interface Output {
  city: string;
  district: string;
}

export default function trimMySubLocality(mySubLocality: string | undefined): Output {
  if (!mySubLocality) {
    return { city: '', district: '' };
  }

  const mySubLocalityArr = mySubLocality.split(' ');

  if (mySubLocalityArr.length < 3) {
    return { city: '', district: '' };
  }

  const city = mySubLocalityArr[mySubLocalityArr.length - 2];
  const district = mySubLocalityArr[mySubLocalityArr.length - 1];
  return { city, district };
}
