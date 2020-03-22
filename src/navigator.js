import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FirstScreen from "./first-screen";
import SecondScreen from "./second-screen";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="First" component={FirstScreen} />
      <Stack.Screen name="Second" component={SecondScreen} />
    </Stack.Navigator>
  );
};
