import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
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
      {({ values, errors, handleChange }) => (
        <View style={styles.container}>
          <TextInput
            autoCapitalize="none"
            label="Email"
            value={values.email}
            onChangeText={handleChange("email")}
            style={styles.input}
          />
          <TextInput
            autoCapitalize="none"
            label="Address"
            value={values.address}
            onChangeText={handleChange("address")}
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={() => {
              dispatch({
                type: "UPDATE_FORM",
                payload: {
                  id: "customer",
                  data: { values, errors }
                }
              });
              alert(JSON.stringify(values, null, 2));
            }}
          >
            submit
          </Button>
          <Card style={{ width: 200, height: 200, marginTop: 50 }}>
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
  }
});
