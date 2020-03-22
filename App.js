import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { FormProvider } from "./src/form-context";
import Navigator from "./src/navigator";

export default function App() {
  return (
    <PaperProvider>
      <FormProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </FormProvider>
    </PaperProvider>
  );
}
