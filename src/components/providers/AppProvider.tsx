"use client";

import { ReactNode, useMemo, useReducer } from "react";
import { createContext } from "react";
import { Action, AppDispatch, AppState, IAppState, reducer } from "../store";
import { useEditing } from "@/hooks/useEditing";

export const AppContext = createContext<any>({
  alertState: {
    message: "",
  },
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  const { editData, editHandler, resetEditing, setStatus, status } =
    useEditing();
  const [states, dispatch] = useReducer<Reducer<IAppState, Action<any, any>>>(
    reducer,
    AppState
  );

  const state = useMemo(
    () => ({
      states,
      editData,
      status,
    }),
    [states, editData, status]
  );

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        editHandler,
        resetEditing,
        setStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
