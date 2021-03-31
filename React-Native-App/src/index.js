import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { registerRootComponent } from "expo";
import React from "react";
import App from "src/App";

import firebase from "firebase";
import { FireclientProvider } from "react-fireclient";
import { AuthProvider } from "src/utils/auth";
import { firebaseConfig, CloudStorageProvider } from "src/utils/firebase";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storageRef = firebase.storage().ref();

const Root = () => (
  <CloudStorageProvider storageRef={storageRef}>
    <FireclientProvider firestoreDB={db}>
      <AuthProvider auth={auth}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <App />
        </ApplicationProvider>
      </AuthProvider>
    </FireclientProvider>
  </CloudStorageProvider>
);

registerRootComponent(Root);
