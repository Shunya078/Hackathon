import { createStackNavigator } from "@react-navigation/stack";
import { Avatar, Button, Layout, List, Text } from "@ui-kitten/components";
import React, { useState, useContext, useCallback } from "react";
import { useGetDoc, useGetCollection } from "react-fireclient";
import { ImageBackground, StyleSheet, View } from "react-native";
import PostCard from "src/components/PostCard";
import PostDetail from "src/containers/PostDetail";
import Signin from "src/containers/Signin";
import { AuthContext } from "src/utils/auth";
import { MAIN_COLOR } from "src/utils/color";
import { RegisterView } from "src/containers/Signin";
import defaultAvatar from "src/assets/default-avatar.png";

const Profile = ({ navigation }) => {
  const { userInfo, currentUser } = useContext(AuthContext);
  const [posts] = useGetCollection("posts");

  const onFollowButtonPress = () => {};
  const toDetailAc = useCallback(() => navigation.navigate("PostDetail"), []);

  const renderItem = ({ item }) => {
    return (
      <PostCard
        name={userInfo?.name}
        postImgUrl={{
          uri:
            item.data.imgUrl ??
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdummyimage.com%2F&psig=AOvVaw2NmhJdf6BalVQtM1KkjzCO&ust=1598845490257000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCICOvd6BwusCFQAAAAAdAAAAABAD",
        }}
        userImgUrl={userInfo?.imgUrl ? { uri: userInfo.imgUrl } : defaultAvatar}
        description={item.data.content}
        toDetailAc={toDetailAc}
      />
    );
  };

  const renderHeader = () => (
    <Layout style={styles.header} level="1">
      <Avatar
        style={styles.profileAvatar}
        size="large"
        source={userInfo?.imgUrl ? { uri: userInfo.imgUrl } : defaultAvatar}
      />
      <View style={styles.profileDetailsContainer}>
        <Text category="h4">{userInfo?.name}</Text>
        <Text appearance="hint" category="s1">
          {userInfo?.location}
        </Text>
        <Text>follower: {userInfo?.followCount}</Text>
        <Button style={styles.followButton} onPress={onFollowButtonPress}>
          FOLLOW
        </Button>
      </View>
    </Layout>
  );

  return (
    <List
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={posts}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
    />
  );
};

const Stack = createStackNavigator();

const Account = ({ uid }) => {
  const { setUserInfo } = useContext(AuthContext);
  const [user, , loadFn] = useGetDoc(`users/${uid}`, {
    callback: (d) => setUserInfo(d.data),
  });
  return (
    <>
      {user.data ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerStyle: {
                backgroundColor: MAIN_COLOR,
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="PostDetail"
            component={PostDetail}
            options={{
              headerStyle: {
                backgroundColor: MAIN_COLOR,
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
      ) : (
        <RegisterView
          uid={uid}
          registerCallback={() => console.log("asdfasdfasdfs")}
        />
      )}
    </>
  );
};

export default () => {
  const { currentUser } = useContext(AuthContext);
  return <>{currentUser ? <Account uid={currentUser.uid} /> : <Signin />}</>;
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  header: {
    flexDirection: "row",
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 8,
  },
  profileAvatar: {
    marginHorizontal: 8,
  },
  profileDetailsContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  profileSocialsContainer: {
    flexDirection: "row",
    marginTop: 24,
  },
  profileSocialContainer: {
    flex: 1,
  },
  followButton: {
    marginVertical: 16,
  },
  post: {
    margin: 8,
  },
  postHeader: {
    height: 220,
  },
  postBody: {
    flexDirection: "row",
    marginHorizontal: -8,
  },
  postAuthorContainer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  iconButton: {
    flexDirection: "row-reverse",
    paddingHorizontal: 0,
  },
});
