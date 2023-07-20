import Box from "../Box";
import Input from "../Input";

/**
 * Search component
 * @returns
 */
type TableSearchProps = React.InputHTMLAttributes<HTMLInputElement> & {};
const TableSearch = ({ value, ...rest }: TableSearchProps) => {
  return (
    <Box>
      <Input value={value} {...rest} />
    </Box>
  );
};

export default TableSearch;
