import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PostMap from "src/containers/PostMap";
import NewPostModal from "src/components/NewPostModal";
import Timeline from "src/containers/Timeline";
import Account from "src/containers/Account";
import FlashMessage from "react-native-flash-message";

process.cwd = function () {
  return "/";
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigatorProps = {
  mode: "modal",
  headerMode: "none",
  options: { cardStyle: { backgroundColor: "transparent" } },
};

const TabScreen = () => (
  <Tab.Navigator>
    <Tab.Screen name="Timeline" component={Timeline} />
    <Tab.Screen name="PostMap" component={PostMap} />
    <Tab.Screen name="Account" component={Account} />
  </Tab.Navigator>
);

const App = () => (
  <>
    <NavigationContainer>
      <Stack.Navigator {...StackNavigatorProps}>
        <Stack.Screen name="TabScreen" component={TabScreen} />
        <Stack.Screen
          name="newPost"
          component={NewPostModal}
          options={{
            title: "Modal",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTitleStyle: {
              fontWeight: "bold",
            },
            cardStyle: { backgroundColor: "transparent" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    <FlashMessage position="top" />
  </>
);

export default App;
