import NavItem from "@/components/layout/NavItem";
import { AppContent } from "@/utils/content";
import { Status } from "@/utils/types";
import { FaEyeSlash, FaPencilAlt, FaTrash } from "react-icons/fa";

type ActionProps<T> = {
  row: T;
  handler: (status: Status, row: T) => void;
};

const TableActionItems = <T extends { id: string; active: boolean }>({
  row,
  handler,
}: ActionProps<T>) => {
  return (
    <>
      <NavItem href="#" scroll={false} onClick={() => handler("edit", row)}>
        <FaPencilAlt className="me-2" /> {AppContent.edit}
      </NavItem>
      <NavItem
        href="#"
        scroll={false}
        onClick={() => handler(row.active ? "inactive" : "active", row)}
      >
        <FaEyeSlash className="me-2" /> {AppContent.inactive}
      </NavItem>
      <NavItem href="#" scroll={false} onClick={() => handler("delete", row)}>
        <FaTrash className="me-2" /> {AppContent.delete}
      </NavItem>
    </>
  );
};

export default TableActionItems;
