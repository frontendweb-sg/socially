import Component from "../Component";

type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
  as?: "td" | "th";
};

const TableCell = ({ as = "td", children, ...rest }: TableCellProps) => {
  return (
    <Component as={as} {...rest}>
      {children}
    </Component>
  );
};

export default TableCell;
