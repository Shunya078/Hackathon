import React, { createContext } from "react";
import { randomString } from "./misc";

export const firebaseConfig = {
  apiKey: "AIzaSyAt_6j0kuPjnBdApG9hcBP8lWg92qPqScw",
  authDomain: "spajam-develop3.firebaseapp.com",
  databaseURL: "https://spajam-develop3.firebaseio.com",
  projectId: "spajam-develop3",
  storageBucket: "spajam-develop3.appspot.com",
  messagingSenderId: "344310558574",
  appId: "1:344310558574:web:e090783592b3d664571b7f",
  measurementId: "G-TT4EX3NJTT",
};
export const CloudStorageContext = createContext();
export const CloudStorageProvider = ({ children, storageRef }) => {
  return (
    <CloudStorageContext.Provider value={{ storageRef: storageRef }}>
      {children}
    </CloudStorageContext.Provider>
  );
};
export async function uploadImage(uri, ref) {
  try {
    const localUrl = await fetch(uri);
    const localBlob = await localUrl.blob();
    const filename = randomString(16);
    const storageRef = ref.child(`images/${filename}`);
    await storageRef.put(localBlob);
    const url = storageRef.getDownloadURL();
    return url;
  } catch (e) {
    console.error(e);
    return null;
  }
}
