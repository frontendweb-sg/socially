import classNames from "classnames";
import Link from "next/link";
import {
  usePathname,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";

const Breadcrumbs = () => {
  const segment = useSelectedLayoutSegment();
  const pathname = usePathname()
    ?.split("/")
    ?.filter((route) => route !== "");
  const segments = useSelectedLayoutSegments();

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {segments.map((route: string) =>
          route === pathname[pathname.length - 1] ? (
            <li
              className={classNames(
                "breadcrumb-item",
                route === pathname[pathname.length - 1] && "active"
              )}
              key={route}
            >
              {route}
            </li>
          ) : (
            <Link
              className="breadcrumb-item"
              href={"/" + segment + "/" + pathname[pathname.length - 1]}
              key={route}
            >
              {route}
            </Link>
          )
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
