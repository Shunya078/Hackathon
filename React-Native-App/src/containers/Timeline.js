import { createStackNavigator } from "@react-navigation/stack";
import { List } from "@ui-kitten/components";
import React from "react";
import { useGetCollection } from "react-fireclient";
import { Button, StyleSheet } from "react-native";
import NewPostModal from "src/components/NewPostModal";
import { MAIN_COLOR } from "src/utils/color";
import PostCard from "../components/PostCard";

const Timeline = ({ posts }) => {
  const renderItem = (post) => (
    <PostCard
      name={post.item.data.createdBy ?? "ゲストユーザー"}
      postImgUrl={{
        uri:
          "https://s3-ap-northeast-1.amazonaws.com/qiita-image-store/0/435614/6d76dfb7a5ce9d1b77784a5a2776bdd7037bc0fd/large.png?1583038513",
      }}
      userImgUrl={null}
      description={post.item.data.content}
      time="1日前"
    />
  );
  return (
    <List
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={posts}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

const Stack = createStackNavigator();

export default () => {
  const [posts, , , reloadPostsFn] = useGetCollection("posts");
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="timeline"
        options={({ navigation }) => ({
          title: "タイムライン",
          headerStyle: {
            backgroundColor: MAIN_COLOR,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => (
            <Button
              onPress={() => {
                navigation.navigate("newPostModal");
              }}
              title="投稿"
              color="#fff"
            />
          ),
        })}
      >
        {(props) => <Timeline {...props} posts={posts} />}
      </Stack.Screen>
      <Stack.Screen
        name="newPostModal"
        options={{
          headerShown: false,
          title: "タイムライン",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          cardStyle: { backgroundColor: "transparent" },
        }}
      >
        {(props) => <NewPostModal {...props} callback={reloadPostsFn} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
