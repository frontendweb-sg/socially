import Box from "./Box";
import { FaUpload } from "react-icons/fa";
import { useRef, forwardRef } from "react";
import Button from "./Button";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {};
type fileRef = HTMLInputElement;
const FileUpload = forwardRef<fileRef, Props>(({}, ref) => {
  const fileref = useRef<HTMLInputElement>(null);

  const onOpen = () => {
    if (fileref.current) fileref.current.click();
  };

  return (
    <Box className="upload">
      <input type="file" ref={fileref} />
      <Button as="icon" onClick={onOpen}>
        <FaUpload />
      </Button>
    </Box>
  );
});

export default FileUpload;
