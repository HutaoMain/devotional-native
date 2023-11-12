import {
  Ionicons,
  FontAwesome5,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigation from "./HomeStackNavigation";
import Chat from "../screens/Chat";
import Books from "../screens/Books";
import Bookmarks from "../screens/Bookmarks";

const BottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName: any;
          let Icon: any;

          if (route.name === "HomeStackNavigation") {
            iconName = focused ? "home" : "home";
            Icon = Ionicons;
          } else if (route.name === "Books") {
            iconName = focused ? "bible" : "bible";
            Icon = FontAwesome5;
          } else if (route.name === "Bookmarks") {
            iconName = focused ? "bookmark" : "bookmark";
            Icon = FontAwesome;
          } else if (route.name === "Chat") {
            iconName = focused ? "chat" : "chat";
            Icon = Entypo;
          }

          return (
            <Icon
              name={iconName}
              size={size}
              color={focused ? "#3FCD67" : "black"}
            />
          );
        },
        tabBarStyle: {
          height: 60,
          backgroundColor: "white",
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="HomeStackNavigation"
        component={HomeStackNavigation}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Books"
        component={Books}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={Bookmarks}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
