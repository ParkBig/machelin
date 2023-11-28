import { StatusBar } from 'expo-status-bar';
import { RecoilRoot } from 'recoil';
import Router from 'screens/router/Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useForegroundPermissions } from 'expo-location';
import { useEffect } from 'react';
import { verifyLocationPermissions, verifyMediaLibraryPermissions } from 'util/accessRight';
import { useMediaLibraryPermissions } from 'expo-image-picker';

const queryClient = new QueryClient();

export default function App() {
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
  const [mediaLibraryPermissionInfo, reqMediaLibraryPermission] = useMediaLibraryPermissions();

  useEffect(() => {
    (async () => {
      await verifyLocationPermissions(locationPermissionInformation, requestPermission);
      await verifyMediaLibraryPermissions(mediaLibraryPermissionInfo, reqMediaLibraryPermission);
    })();
  }, [locationPermissionInformation, requestPermission, mediaLibraryPermissionInfo, reqMediaLibraryPermission]);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <StatusBar style="light" />
        <Router />
      </RecoilRoot>
    </QueryClientProvider>
  );
}
