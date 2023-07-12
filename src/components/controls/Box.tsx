import { FC } from "react";
interface DivProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

/**
 * Div component
 * @param param0
 * @returns
 */
const Box: FC<DivProps> = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};

export default Box;
