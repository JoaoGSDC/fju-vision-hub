import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  children?: React.ReactNode;
  href: string;
  /** Mantidos por compatibilidade, ignorados no Next */
  activeClassName?: string;
  pendingClassName?: string;
}

function NavLink({ className, children, href, ...rest }: NavLinkProps) {
  // Se for um link externo, use uma tag <a> normal
  if (href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto:')) {
    return (
      <a 
        href={href} 
        className={cn(className)}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }

  // Para rotas internas, use o componente Link do Next.js
  return (
    <Link 
      href={href as any} 
      className={cn(className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

export { NavLink };
