import { Ionicons, FontAwesome5, Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigation from "./HomeStackNavigation";
import Bible from "../screens/Bible";
import Chat from "../screens/Chat";

const BottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName: any;
          let Icon: any;

          if (route.name === "HomeStackNavigation") {
            iconName = focused ? "home" : "home-outline";
            Icon = Ionicons;
          } else if (route.name === "Bible") {
            iconName = focused ? "bible" : "bible";
            Icon = FontAwesome5;
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
        name="Bible"
        component={Bible}
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
