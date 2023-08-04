import Button from "./Button";
import Box from "./Box";
import { AppProps } from "@/utils/types";
import { FC, forwardRef } from "react";
import { AppContent } from "@/utils/content";

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {}
type formRef = HTMLFormElement;
const Form = forwardRef<formRef, Props>(({ children, ...rest }, ref) => {
  return (
    <form ref={ref} noValidate {...rest}>
      {children}
    </form>
  );
});

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
