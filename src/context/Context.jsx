import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isFetching: false,
  error: false,
  userId: null,
};
export const Context = createContext(INITIAL_STATE);

// Déclaration de la fonction ClearNewProfilePic en dehors du composant ContextProvider
export const ClearNewProfilePic = (dispatch) => {
  dispatch({ type: "CLEAR_NEW_PROFILE_PIC" });
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, {
    user: JSON.parse(localStorage.getItem("user")) || null,
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user?.username || null));
  }, [state.user]);

  const storeToken = (token) => {
    try {
      localStorage.setItem("token", token);
      dispatch({ type: "STORE_TOKEN", payload: token });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: true });
    }
  };

  return (
    <Context.Provider
      value={{
        user: state.user,
        token: state.token,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        storeToken,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
