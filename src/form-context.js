import * as React from "react";

const FormStateContext = React.createContext();
const FormDispatchContext = React.createContext();

const initialState = {
  customer: {
    values: {},
    errors: {}
  }
};

const formReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_FORM":
      return {
        ...state,
        [payload.id]: payload.data
      };
    case "UPDATE_FORM":
      return {
        ...state,
        [payload.id]: {
          ...payload.data
        }
      };
    case "UPDATE_VALUES":
      return {
        ...state,
        [payload.id]: {
          values: {
            ...payload.data
          }
        }
      };
    case "UPDATE_ERRORS":
      return {
        ...state,
        [payload.id]: {
          errors: {
            ...payload.data
          }
        }
      };
    default:
      return state;
  }
};

const FormProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(formReducer, initialState);

  return (
    <FormStateContext.Provider value={state}>
      <FormDispatchContext.Provider value={dispatch}>
        {children}
      </FormDispatchContext.Provider>
    </FormStateContext.Provider>
  );
};

const useFormState = id => {
  const formState = React.useContext(FormStateContext);

  if (formState === undefined) {
    throw new Error('useFormState must be used within a FormProvider"');
  }

  return formState[id];
};

const useFormDispatch = () => {
  const dispatch = React.useContext(FormDispatchContext);

  if (dispatch === undefined) {
    throw new Error('useFormState must be used within a FormProvider"');
  }

  return dispatch;
};

export { FormProvider, useFormState, useFormDispatch };
