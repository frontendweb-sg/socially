import classNames from "classnames";
import Link, { LinkProps } from "next/link";

type LogoProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {};
const Logo = ({ href = "/", children, className, ...rest }: LogoProps) => {
  const classes = classNames("navbar-brand", className);
  return (
    <Link href={href} {...rest} className={classes}>
      Socially
    </Link>
  );
};
export default Logo;
