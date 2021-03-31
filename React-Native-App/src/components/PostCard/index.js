import { Card, Text, Avatar } from "@ui-kitten/components";
import React, { useState, useCallback } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import defaultAvatar from "src/assets/default-avatar.png";

const win = Dimensions.get("window");
const renderItemHeader = ({ name, postImgUrl, userImgUrl, time }) => (
  <>
    <TouchableOpacity onPress={() => console.log("user")}>
      <View style={styles.Headder}>
        <Avatar style={styles.userImage} source={userImgUrl || defaultAvatar} />
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </TouchableOpacity>
    <AutoHeightImage width={win.width} source={postImgUrl} />
  </>
);

const renderItemFooter = () => {
  const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const likeAc = useCallback(() => setLike(!like), [like]);
  const bookmarkAc = useCallback(() => setBookmark(!bookmark), [bookmark]);

  return (
    <View style={styles.itemFooter}>
      <View style={styles.itemReactionsContainer}>
        <TouchableOpacity onPress={likeAc}>
          <AnimatedIcon
            style={styles.icon}
            animation={like && "jello"}
            name={like ? "heart" : "heart-o"}
            color={like ? "#FF0000" : "#a9a9a9"}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            style={styles.icon}
            color="#a9a9a9"
            name="comment-o"
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            style={styles.icon}
            color="#a9a9a9"
            name="share-square-o"
            size={30}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={bookmarkAc}>
        <AnimatedIcon
          style={styles.icon}
          animation={bookmark && "bounceInLeft"}
          name={bookmark ? "plane" : "bookmark-o"}
          color={bookmark ? "#FF0000" : "#a9a9a9"}
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
};
// created by Kato. Feel free to ask me questions
const PostCard = ({
  name,
  postImgUrl,
  userImgUrl,
  description,
  time,
  toDetailAc,
}) => {
  const renderHeader = useCallback(
    () => renderItemHeader({ name, postImgUrl, userImgUrl, time }),
    [JSON.stringify({ name, postImgUrl, userImgUrl, time })]
  );

  return (
    <Card style={styles.item} header={renderHeader} onPress={toDetailAc}>
      <Text style={styles.itemDescription} category="s1">
        {description}
      </Text>
    </Card>
  );
};
const styles = StyleSheet.create({
  Headder: {
    width: "auto",
    height: 50,
    display: "flex",
    flexDirection: "row",
  },
  userImage: {
    marginLeft: 10,
    width: 30,
    height: 30,
    marginTop: 10,
  },
  userName: {
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  time: {
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
    color: "#a9a9a9",
  },
  item: {
    marginVertical: 8,
  },
  itemHeader: {
    padding: 24,
  },
  itemDescription: {
    marginHorizontal: -8,
    marginTop: 16,
  },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    paddingTop: 10,
  },
  itemReactionsContainer: {
    flexDirection: "row",
  },
  itemAddButton: {
    flexDirection: "row-reverse",
    paddingHorizontal: 0,
  },
  icon: {
    paddingRight: 8,
    paddingLeft: 8,
  },
});
export default PostCard;
