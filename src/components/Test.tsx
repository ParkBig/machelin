import React, { useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Button, StyleSheet } from 'react-native';

const App = () => {
  const mapRef = useRef<MapView>(null);

  const focusMarker = () => {
    // 특정 마커의 위치 정보 (latitude, longitude)를 설정합니다.
    const markerCoordinate = { latitude: YOUR_MARKER_LATITUDE, longitude: YOUR_MARKER_LONGITUDE };

    // 지도를 특정 마커의 위치로 이동합니다.
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: markerCoordinate.latitude,
        longitude: markerCoordinate.longitude,
        latitudeDelta: 0.01, // 원하는 확대 수준을 설정합니다.
        longitudeDelta: 0.01,
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: INITIAL_LATITUDE,
          longitude: INITIAL_LONGITUDE,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* 마커를 지도 위에 표시합니다. */}
        <Marker coordinate={{ latitude: YOUR_MARKER_LATITUDE, longitude: YOUR_MARKER_LONGITUDE }} />
      </MapView>

      {/* 포커스 버튼을 누르면 특정 마커를 포커스합니다. */}
      <Button title="Focus Marker" onPress={focusMarker} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default App;
