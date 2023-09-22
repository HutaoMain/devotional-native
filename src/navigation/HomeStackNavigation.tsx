import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeNavigationStackProps } from "../NavigationProps";
import Home from "../screens/Home";

const HomeStackNavigation = () => {
  const HomeStack = createNativeStackNavigator<HomeNavigationStackProps>();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigation;
