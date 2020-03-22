import * as React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Card, Text } from "react-native-paper";
import { Formik } from "formik";
import { useFormState, useFormDispatch } from "./form-context";

export default ({ navigation }) => {
  const form = React.useRef();
  const dispatch = useFormDispatch();
  const { values: formValues, errors: formErrors } = useFormState("customer");

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      if (form.current) {
        const { values, errors } = form.current;
        dispatch({
          type: "UPDATE_FORM",
          payload: {
            id: "customer",
            data: { values, errors }
          }
        });
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Formik
      innerRef={form}
      initialValues={formValues}
      initialErrors={formErrors}
      enableReinitialize
    >
      {({ values, handleChange }) => (
        <View style={styles.container}>
          <TextInput
            autoCapitalize="none"
            label="First Name"
            value={values.first_name}
            onChangeText={handleChange("first_name")}
            style={styles.input}
          />
          <TextInput
            autoCapitalize="none"
            label="Last Name"
            value={values.last_name}
            onChangeText={handleChange("last_name")}
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={() => {
              navigation.push("Second");
            }}
          >
            Next
          </Button>
          <Card style={styles.card}>
            <Text>{JSON.stringify(values, null, 2)}</Text>
          </Card>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    height: 50,
    width: 300,
    marginVertical: 20
  },
  card: {
    width: 200,
    height: 200,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center"
  }
});
