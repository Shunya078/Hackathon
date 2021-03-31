import * as ImagePicker from "expo-image-picker";
import { randomString } from "./misc";

export async function takePhoto() {
  const p = await ImagePicker.requestCameraPermissionsAsync();
  if (!p.granted) return;
  const r = await ImagePicker.launchCameraAsync({
    //allowsEditing: true,
    quality: 1,
  });
  return r.cancelled ? null : r;
}
export async function importLocalImage() {
  const p = await ImagePicker.requestCameraRollPermissionsAsync();
  if (!p.granted) return;

  const r = await ImagePicker.launchImageLibraryAsync({
    //allowsEditing: true,
    quality: 1,
  });
  return r.cancelled ? null : r;
}
