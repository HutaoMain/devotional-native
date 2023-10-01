import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeNavigationStackProps } from "../types/NavigationProps";
import Home from "../screens/Home";
import Books from "../screens/Books";
// import Chapters from "../screens/Chapters";

const HomeStackNavigation = () => {
  const HomeStack = createNativeStackNavigator<HomeNavigationStackProps>();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Books"
        component={Books}
        options={{ headerShown: false }}
      />
      {/* <HomeStack.Screen
        name="Chapters"
        component={Chapters}
        options={{ headerShown: false }}
      /> */}
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigation;
