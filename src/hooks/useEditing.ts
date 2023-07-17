import { Status } from "@/utils/types";
import { cloneDeep } from "lodash";
import { useCallback, useState } from "react";

export function useEditing<T>() {
  const [status, setStatus] = useState<Status>("default");

  const [editData, setEditData] = useState<null | T>(null);
  const editHandler = useCallback(
    (data: T) => setEditData(cloneDeep(data)),
    []
  );
  const resetEditing = useCallback(() => setEditData(null), []);

  const statusChangeHandler = (status: Status) => setStatus(status);

  return {
    status,
    editData,
    editHandler,
    resetEditing,
    statusChangeHandler,
  };
}
