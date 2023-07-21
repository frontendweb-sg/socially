import classNames from "classnames";
import Container from "../controls/Container";
import Typography from "../controls/Typography";

/**
 * Footer component
 * @returns
 */
type FooterProps = React.HtmlHTMLAttributes<HTMLDivElement> & {};
const Footer = ({ className, ...rest }: FooterProps) => {
  return (
    <footer className={classNames("footer", className)} {...rest}>
      <Container>
        <Typography variant="span">
          &copy; {new Date().getFullYear()} - All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};
export default Footer;
