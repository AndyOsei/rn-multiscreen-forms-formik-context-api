import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { FormProvider } from "./src/form-context";
import Navigator from "./src/navigator";

export default function App() {
  return (
    <NavigationContainer>
      <FormProvider>
        <Navigator />
      </FormProvider>
    </NavigationContainer>
  );
}
