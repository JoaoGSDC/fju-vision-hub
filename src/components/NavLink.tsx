import Link, { LinkProps } from "next/link";
import { cn } from "@/lib/utils";

type NavLinkProps = LinkProps & {
  className?: string;
  children?: React.ReactNode;
  href: LinkProps["href"];
  /** Mantidos por compatibilidade, ignorados no Next */
  activeClassName?: string;
  pendingClassName?: string;
};

function NavLink({ className, children, href, ...rest }: NavLinkProps) {
  return (
    <Link href={href} {...rest} className={cn(className)}>
      {children}
    </Link>
  );
}

export { NavLink };
