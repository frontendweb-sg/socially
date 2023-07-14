"use client";

import { ReactNode, useReducer } from "react";
import { createContext } from "react";
import { Action, AppDispatch, AppState, IAppState, reducer } from "../store";

export const AppContext = createContext<any>({
  alertState: {
    message: "",
  },
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<IAppState, Action<any, any>>>(
    reducer,
    AppState
  );

  return (
    <AppContext.Provider value={[state, dispatch] as [IAppState, AppDispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
