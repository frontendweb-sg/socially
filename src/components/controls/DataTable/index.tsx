import Box from "../Box";
import NavItem from "@/components/layout/NavItem";
import NoData from "./NoData";
import Dropdown from "../Dropdown";
import { ReactElement, useMemo } from "react";
import { keys, upperFirst } from "lodash";
import { FaCircle, FaEyeSlash, FaPencilAlt, FaTrash } from "react-icons/fa";
import { Status } from "@/utils/types";
import { AppContent } from "@/utils/content";
import TableActionItems from "./TableActionItems";

type Common<T> = {
  [porp in keyof T]: T[porp];
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
  data: T[];
  columns?: Array<ColumnDefinitionType<T, K>>;
  hideCols?: string[];
  renderAction?: (data: T) => ReactElement;
  onHandler?: (status: Status, data: T) => void;
};
const DataTable = <T extends Common<T>, K extends keyof T>({
  data,
  hideCols,
  renderAction,
  onHandler,
}: DataTableProps<T, K>) => {
  const transformData = useMemo(() => {
    const updated = data.map(
      (row: T) => {
        const keys = Object.keys(row).filter((key) => !hideCols?.includes(key));
        const obj = keys
          .map((key: string) => ({ [key]: row[key as keyof T] }))
          .reduce((acc, next) => {
            return Object.assign(acc, next);
          }, {});
        return obj;
      },
      [data, hideCols]
    );
    return updated;
  }, [data, hideCols]);

  const heading = Object.keys((data && data[0]) ?? []).filter(
    (key: string) => !hideCols?.includes(key)
  );

  if (data && data.length === 0) return <NoData />;

  return (
    <Box>
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
          {data.map((row: any) => (
            <tr key={row.id}>
              {heading.map((key: string) =>
                key === "active" ? (
                  <td key={key}>
                    <FaCircle
                      className={row[key] ? "text-success" : "text-danger"}
                    />
                  </td>
                ) : (
                  <td key={key}>{row[key]}</td>
                )
              )}
              {keys.length !== 0 && (
                <td>
                  <Dropdown>
                    {renderAction ? (
                      renderAction(row)
                    ) : (
                      <TableActionItems row={row} handler={onHandler!} />
                    )}
                  </Dropdown>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};
export default DataTable;
