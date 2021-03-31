import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Avatar, Button, Divider, Layout, Text } from "@ui-kitten/components";
import CenterView from "src/components/CenterView";

const user = {
  name: "shinji",
  email: "shinji@tujituji.com",
  location: "tokyo",
  comment: "I'm city boy !!!",
  imgUrl:
    "https://s3-ap-northeast-1.amazonaws.com/qiita-image-store/0/435614/6d76dfb7a5ce9d1b77784a5a2776bdd7037bc0fd/large.png?1583038513",
  follow_count: 10,
};

const samplePost = {
  imgUrl: "https://www.the0123.com/pref/img/img_ehime_01.jpg",
  title: "title",
  content: "",
  date: "2020/12/25",
};

const PostDetail = ({ navigation }) => {
  return (
    <Layout style={styles.container}>
      <Image
        style={styles.headerContainer}
        source={{ uri: samplePost.imgUrl }}
      ></Image>
      <Layout style={styles.contentContainer} level="1">
        <Text>{samplePost.content}</Text>
      </Layout>
      <Divider />
      <View style={styles.activityContainer}>
        <Avatar source={{ uri: user.imgUrl }} />
        <View style={styles.authoringInfoContainer}>
          <Text>{user.name}</Text>
          <Text appearance="hint" category="p2">
            {samplePost.date}
          </Text>
        </View>
        <Button
          style={styles.iconButton}
          appearance="ghost"
          status="basic"
        ></Button>
        <Button
          style={styles.iconButton}
          appearance="ghost"
          status="danger"
        ></Button>
      </View>
    </Layout>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    minHeight: 256,
    paddingVertical: 24,
  },
  headerTitle: {
    textAlign: "center",
    marginVertical: 24,
    zIndex: 1,
  },
  headerDescription: {
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  activityContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  authoringInfoContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
