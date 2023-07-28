import Box from "./Box";

type Props = React.HtmlHTMLAttributes<HTMLDivElement> & {};

const Tooltip = ({ children }: Props) => {
  return <Box>{children}</Box>;
};

export default Tooltip;
