import { StatusBar } from 'expo-status-bar';
import { RecoilRoot } from 'recoil';
import Router from 'screens/router/Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useForegroundPermissions } from 'expo-location';
import { useEffect } from 'react';
import { verifyLocationPermissions, verifyMediaLibraryPermissions, verifyMessagingPermissions } from 'util/accessRight';
import { useMediaLibraryPermissions } from 'expo-image-picker';
import { Alert } from 'react-native';
import { createAxiosInstance } from 'query/api/api';
import { useNetInfo } from '@react-native-community/netinfo';
import { initTokenDB } from 'util/tokenDB';

const queryClient = new QueryClient();

export default function App() {
  const netInfo = useNetInfo();
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
  const [mediaLibraryPermissionInfo, reqMediaLibraryPermission] = useMediaLibraryPermissions();

  useEffect(() => {
    const versionCheck = async () => {
      if (netInfo.isConnected) {
        const axiosVersions = createAxiosInstance('versions');
        const { data } = await axiosVersions.get('');
  
        if (data.machelinCurrentVersion !== '1.0.406') {
          Alert.alert('업데이트 알림', '원활한 사용을 위해 업데이트 해주세요');
        }
      }
    };

    versionCheck();
  }, []);

  useEffect(() => {
    (async () => {
      await verifyLocationPermissions(locationPermissionInformation, requestPermission);
      await verifyMediaLibraryPermissions(mediaLibraryPermissionInfo, reqMediaLibraryPermission);
    })();
  }, [locationPermissionInformation, requestPermission, mediaLibraryPermissionInfo, reqMediaLibraryPermission]);

  useEffect(() => {
    initTokenDB()
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <StatusBar style="light" />
        <Router />
      </RecoilRoot>
    </QueryClientProvider>
  );
}
