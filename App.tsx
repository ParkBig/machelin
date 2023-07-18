import Test from 'components/mainScreen/Test';
import { StatusBar } from 'expo-status-bar';
import { getDetailRestaurantInfo, getNearbyRestaurants, getRestaurantPhotos } from 'query/restaurants';
import { RecoilRoot } from 'recoil';
import Router from 'screens/router/Router';
import { useEffect, useState } from 'react';
import { Restaurant } from 'types/data/restaureant';

export default function App() {
  const [a, setA] = useState<Restaurant[]>();
  console.log(a)
  useEffect(() => {
    const getData = async () => {
      // 훌륭하게 가져오는중, 이것을 recoil로 가져오는걸로 바꾸자
      // const restaurant = await getNearbyRestaurants(37.4013952, 126.713856);
      // setA(restaurant);
      // getDetailRestaurantInfo("ChIJn-0GjhSkfDUR9kif8SIXAPc");
      // getRestaurantPhotos('Aaw_FcIGROPvvVVG17o3tiUrdjRu2gN2Vbaz-QQ1RFZYc_DKq4AQcXUiiBUBntPvB2dvrC__z9KJJ89-fQkEfpSP5FxBm4ejNPiRJCi2f6Pu27A5xfCJwdrdXHXUup1gBMwvsVoXaf5Ks3pYXk5Zh_clNsCfhgccnHrFYxP-xcY5mbh8PBac');
    }
    getData();
  }, [])
  return (
    <RecoilRoot>
      <StatusBar style='auto' />
      <Router />
      {/* <Test /> */}
    </RecoilRoot>
  );
}
