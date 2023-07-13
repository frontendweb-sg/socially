"use client";

import { ReactNode, useReducer } from "react";
import { createContext } from "react";
import { Action, AppState, IAppState, reducer } from "../store";

export const AppContext = createContext<any>({
  alert: { message: "" },
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<IAppState, Action>>(
    reducer,
    AppState
  );

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
