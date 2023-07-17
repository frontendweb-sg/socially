"use client";

import { ReactNode, useContext, useMemo, useReducer } from "react";
import { createContext } from "react";
import { AppState, reducer } from "../store";

import { useEditing } from "@/hooks/useEditing";

export const AppContext = createContext<AppState>({} as AppState);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [states, dispatch] = useReducer(reducer, AppState);
  const { editData, editHandler, resetEditing, status, statusChangeHandler } =
    useEditing();

  const state = useMemo(
    () => ({
      ...states,
      editData,
      status,
    }),
    [editData, states, status]
  );

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        editHandler,
        resetEditing,
        statusChangeHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppContext);
};
export default AppProvider;
