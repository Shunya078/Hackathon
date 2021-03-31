import { Button, Input, Text } from "@ui-kitten/components";
import * as Location from "expo-location";
import firebase from "firebase";
import React, { useContext, useEffect, useState } from "react";
import { useSetDoc } from "react-fireclient";
import { Dimensions } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import { showMessage } from "react-native-flash-message";
import KeyboardAvoidingView from "src/components/KeyboardAvoidingView";
import { AuthContext } from "src/utils/auth";
import { CloudStorageContext, uploadImage } from "src/utils/firebase";
import { importLocalImage, takePhoto } from "src/utils/image";
import styled from "styled-components/native";

const win = Dimensions.get("window");

const useInputState = (initialValue = "") => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

const NewPostFql = ({ content, imgUrl, createdBy, latitude, longitude }) => ({
  fields: {
    content,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    createdBy,
    imgUrl,
    latitude,
    longitude,
  },
});

const DummyImage = () => (
  <DummyImageBox>
    <Text>画像未選択</Text>
  </DummyImageBox>
);
const LoadedImage = ({ source }) => (
  <StyledImage width={win.width - 60} source={source} />
);

const ModalView = ({ navigation, callback }) => {
  const { currentUser } = useContext(AuthContext);
  const contentInputState = useInputState();
  const { storageRef } = useContext(CloudStorageContext);

  const [myCurrentLatitude, setMyCurrentLatitude] = useState(null);
  const [myCurrentLongitude, setMyCurrentLongitude] = useState(null);

  const [setNewPostFn] = useSetDoc("/posts", NewPostFql, {
    callback: () => {
      showMessage({
        message: "アップロード完了",
        description: "新しい写真の投稿が完了しました。",
        type: "success",
      });
      callback();
      navigation.goBack();
    },
  });
  const [uri, setUri] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("端末の位置情報設定が許可されていません");
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setMyCurrentLatitude(latitude);
      setMyCurrentLongitude(longitude);
    })();
  }, []);

  return (
    <KeyboardAvoidingView>
      <StyledSafeAreaView>
        <StyledCenterView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledInput
            multiline={true}
            textStyle={{ minHeight: 64 }}
            placeholder="この場所についてひとこと"
            {...contentInputState}
          />
          <Buttons>
            <SquareButton
              onPress={async () => {
                const r = await takePhoto();
                if (!r) {
                  showMessage({
                    message: "写真読み込みエラー",
                    description: "新しい写真の読み込みに失敗しました。",
                    type: "danger",
                  });
                  return;
                }
                setUri(r.uri);
              }}
            >
              カメラ
            </SquareButton>
            <SquareButton
              onPress={async () => {
                const r = await importLocalImage();
                if (!r) {
                  showMessage({
                    message: "写真読み込みエラー",
                    description: "新しい写真の読み込みに失敗しました。",
                    type: "danger",
                  });
                  return;
                }
                setUri(r.uri);
              }}
            >
              カメラロール
            </SquareButton>
          </Buttons>
          {uri ? (
            <LoadedImage
              source={{
                uri,
              }}
            />
          ) : (
            <DummyImage />
          )}
          <UploadButton
            disabled={uri === null}
            onPress={async () => {
              const imgUrl = await uploadImage(uri, storageRef);
              setNewPostFn({
                content: contentInputState.value,
                createdBy: currentUser ? currentUser.uid : null,
                imgUrl,
                latitude: Number(myCurrentLatitude),
                longitude: Number(myCurrentLongitude),
              });
            }}
          >
            投稿
          </UploadButton>
        </StyledCenterView>
      </StyledSafeAreaView>
    </KeyboardAvoidingView>
  );
};

const StyledInput = styled(Input)`
  padding: 50px 20px 10px;
`;

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: transparent;
  justify-content: flex-end;
  shadow-color: #000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.3;
  shadow-radius: 40px;
  elevation: 5;
`;
const StyledCenterView = styled.ScrollView`
  background-color: #f5fcff;

  position: absolute;
  bottom: 10;
  left: 6;
  right: 6;
  top: 60;
  border-radius: 15px;
`;

const Buttons = styled.View`
  flex-direction: row;
`;

const SquareButton = styled(Button)`
  margin: 20px 10px 20px;
  width: 150px;
  height: 150px;
`;

const StyledImage = styled(AutoHeightImage)`
  border-radius: 10px;
`;

const DummyImageBox = styled.View`
  width: 300px;
  height: 200px;
  background-color: #cfd8dc;
  border-radius: 10px;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`;

const UploadButton = styled(Button)`
  margin: 30px 0px 50px;
  width: 300px;
`;

export default ModalView;
