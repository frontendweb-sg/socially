import { cloneDeep } from "lodash";
import { useCallback, useState } from "react";

export function useEditing<T>() {
  const [status, setStatus] = useState<
    "default" | "new" | "update" | "edit" | "delete"
  >("default");

  const [editData, setEditData] = useState<null | T>(null);
  const editHandler = useCallback(
    (data: T) => setEditData(cloneDeep(data)),
    []
  );
  const resetEditing = useCallback(() => setEditData(null), []);

  return {
    status,
    editData,
    setStatus,
    editHandler,
    resetEditing,
  };
}
