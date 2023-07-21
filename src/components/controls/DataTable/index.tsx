"use client";
import NoData from "./NoData";
import Dropdown from "../Dropdown";
import TableActionItems from "./TableActionItems";
import TableCell from "./TableCell";
import Skeleton from "../Skeleton";
import Panel from "../Panel";
import Box from "../Box";
import TableSearch from "./TableSearch";
import { ChangeEvent, ReactElement, useMemo, useState } from "react";
import { keys, upperFirst } from "lodash";
import { FaCircle } from "react-icons/fa";
import { Status } from "@/utils/types";

type Common<T> = {
  [prop in keyof T]: T[prop];
};

type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: string;
  width?: number;
};

type DataTableProps<
  T,
  K extends keyof T
> = React.TableHTMLAttributes<HTMLTableElement> & {
  loading?: boolean;
  data: T[];
  columns?: Array<ColumnDefinitionType<T, K>>;
  hideCols?: string[];
  renderAction?: (data: T) => ReactElement;
  onHandler?: (status: Status, data: T) => void;
};

const DataTable = <T extends Common<T>, K extends keyof T>({
  loading = false,
  data,
  columns,
  hideCols = ["slug"],
  renderAction,
  onHandler,
}: DataTableProps<T, K>) => {
  const [searchKey, setSearchKey] = useState("");

  const onSearchHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(ev.target.value);
  };

  const filteredData = useMemo(() => {
    return searchKey
      ? data.filter((row: any) =>
          row["title"].toLowerCase().includes(searchKey.toLowerCase())
        )
      : data;
  }, [searchKey, data]);

  const heading = Object.keys((data && data[0]) ?? []).filter(
    (key: string) => !hideCols?.includes(key)
  );

  if (loading) return <Skeleton />;

  if (data.length === 0) return <NoData />;

  return (
    <Panel className="p-3">
      <Box className="d-flex justify-content-between">
        <TableSearch
          placeholder="Search by title..."
          value={searchKey}
          onChange={onSearchHandler}
        />
      </Box>
      <table className="table table-border">
        <thead>
          <tr>
            {heading.map((key: string) => (
              <th key={key}>{upperFirst(key)}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <>
              <tr>
                <td align="center" colSpan={heading.length + 1}>
                  <NoData />
                </td>
              </tr>
            </>
          ) : (
            filteredData.map((row: any) => (
              <tr key={row.id}>
                {heading.map((key: string) =>
                  key === "active" ? (
                    <TableCell key={key}>
                      <FaCircle
                        className={row[key] ? "text-success" : "text-danger"}
                      />
                    </TableCell>
                  ) : (
                    <TableCell key={key}>{row[key]}</TableCell>
                  )
                )}
                {keys.length !== 0 && (
                  <TableCell key="action">
                    <Dropdown>
                      {renderAction ? (
                        renderAction(row as T)
                      ) : (
                        <TableActionItems row={row} handler={onHandler!} />
                      )}
                    </Dropdown>
                  </TableCell>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Panel>
  );
};
export default DataTable;
