import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/Button';
import { useState } from 'react';
import { MediaTypeOptions, launchImageLibraryAsync, useMediaLibraryPermissions } from 'expo-image-picker';
import { verifyMediaLibraryPermissions } from 'util/verifyMediaLibraryPermissions';

export default function GetImg() {
  const [pickedImage, setPickedImage] = useState<string[]>([]);
  const [mediaLibraryPermissionInfo, reqMediaLibraryPermission] = useMediaLibraryPermissions();

  const addPhotosHandler = async () => {
    const hasMediaLibraryPermission = await verifyMediaLibraryPermissions(
      mediaLibraryPermissionInfo,
      reqMediaLibraryPermission
    );
    if (!hasMediaLibraryPermission) return;

    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 5,
    });

    console.log(result.assets);
  };

  return (
    <Button style={styles.addPhoto} onPress={addPhotosHandler}>
      <Ionicons name="images-outline" size={30} />
      <Text>사진추가하기</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  addPhoto: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
