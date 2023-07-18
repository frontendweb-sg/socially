"use client";

import { ReactNode, useContext, useMemo, useReducer } from "react";
import { createContext } from "react";
import { AppState, reducer } from "../store";

import { useEditing } from "@/hooks/useEditing";
import useConfirmation from "@/hooks/useConfirmation";

export const AppContext = createContext<AppState>({} as AppState);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [states, dispatch] = useReducer(reducer, AppState);
  const { editData, editHandler, resetEditing, status, statusChangeHandler } =
    useEditing();
  const { confirm, onCancelConfirm, onConfirm } = useConfirmation();
  const state = useMemo(
    () => ({
      ...states,
      editData,
      status,
      confirm,
    }),
    [editData, confirm, states, status]
  );

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        editHandler,
        resetEditing,
        statusChangeHandler,
        onCancelConfirm,
        onConfirm,
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
