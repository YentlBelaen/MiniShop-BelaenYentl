import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { RootTabParamList } from "../types/navigation";
import HomeStackNavigator from "./HomeStackNavigator";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function RootTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
