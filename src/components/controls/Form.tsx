import Button from "./Button";
import Box from "./Box";
import { AppProps } from "@/utils/types";
import { FC } from "react";
import { AppContent } from "@/utils/content";
interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const Form: FC<IFormProps> = ({ children, ...rest }) => {
  return (
    <form noValidate {...rest}>
      {children}
    </form>
  );
};

interface IFormButton extends AppProps {
  label?: string;
}
const FormButton: FC<IFormButton> = ({ children, label, ...rest }) => {
  return (
    <Box className="form-button">
      {children}
      <Button type="submit" {...rest}>
        {label}
      </Button>
    </Box>
  );
};

FormButton.defaultProps = {
  label: AppContent.save,
};
export default Object.assign(Form, { FormButton });
