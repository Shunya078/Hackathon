import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableHighlight,
} from "react-native";
import {
  Input,
  Layout,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { useGetCollection } from "react-fireclient";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import WithHeader from "src/components/WithHeader";
import PostCard from "../components/PostCard";

import { getLatlng } from "../api";

const PostMap = () => {
  const [myCurrentLatitude, setMyCurrentLatitude] = useState(null);
  const [myCurrentLongitude, setMyCurrentLongitude] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [content, setContent] = useState("検索");
  const [posts] = useGetCollection("posts");

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

  const handleSearch = async () => {
    const place = content;
    await getLatlng(place).then((e) => {
      setMyCurrentLatitude(e["lat"]);
      setMyCurrentLongitude(e["lng"]);
    });
  };

  const styles = useStyleSheet(themedStyles);

  return (
    <>
      {errorMsg !== null && <Text>{errorMsg}</Text>}
      <Layout style={styles.formContainer} level="1">
        <Input
          placeholder="検索"
          value={content}
          onChangeText={(content) => setContent(content)}
        />
      </Layout>
      <Button onPress={handleSearch} title="Search" color="#841584" />
      {myCurrentLatitude && myCurrentLongitude && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: Number(myCurrentLatitude),
            longitude: Number(myCurrentLongitude),
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <MapView.Marker
            pinColor={"blue"}
            coordinate={{
              latitude: Number(myCurrentLatitude),
              longitude: Number(myCurrentLongitude),
            }}
          >
            <MapView.Callout tooltip>
              <TouchableHighlight
                onPress={() => this.markerClick()}
                underlayColor="#dddddd"
              >
                <View>
                  <Text>現在地</Text>
                </View>
              </TouchableHighlight>
            </MapView.Callout>
          </MapView.Marker>
          {posts.map((p) => Post(p))}
        </MapView>
      )}
    </>
  );
};

const Post = (post) => {
  return (
    <MapView.Marker
      pinColor={"red"}
      coordinate={{
        latitude: Number(post.data.latitude),
        longitude: Number(post.data.longitude),
      }}
    >
      <MapView.Callout tooltip>
        <TouchableHighlight
          onPress={() => this.markerClick()}
          underlayColor="#dddddd"
        >
          <View>
            <PostCard
              postImgUrl={{
                uri:
                  "https://s3-ap-northeast-1.amazonaws.com/qiita-image-store/0/435614/6d76dfb7a5ce9d1b77784a5a2776bdd7037bc0fd/large.png?1583038513",
              }}
              description={post.data.content}
            />
          </View>
        </TouchableHighlight>
      </MapView.Callout>
    </MapView.Marker>
  );
};

const themedStyles = StyleService.create({
  formContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  emailInput: {
    marginTop: 16,
  },
});

export default WithHeader(PostMap, "マップ");
