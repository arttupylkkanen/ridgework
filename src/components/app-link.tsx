import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/locale";

type Props = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

export function GuideLink({
  locale,
  slug,
  className,
  children,
  onClick,
}: Props & { locale: Locale; slug?: string }) {
  if (!slug) {
    if (locale === "en") {
      return (
        <Link to="/guides" className={className} onClick={onClick}>
          {children}
        </Link>
      );
    }
    return (
      <Link to="/$locale/guides" params={{ locale }} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  if (locale === "en") {
    return (
      <Link to="/guides/$slug" params={{ slug }} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <Link to="/$locale/guides/$slug" params={{ locale, slug }} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function DeskLink({
  locale,
  program,
  className,
  children,
  onClick,
}: Props & { locale: Locale; program?: string }) {
  const search = program ? { program } : undefined;
  if (locale === "en") {
    return (
      <Link to="/app" search={search} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <Link to="/$locale/app" params={{ locale }} search={search} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function AuthLink({
  locale,
  program,
  className,
  children,
  onClick,
}: Props & { locale: Locale; program?: string }) {
  const search = program ? { program } : undefined;
  if (locale === "en") {
    return (
      <Link to="/login" search={search} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <Link to="/$locale/login" params={{ locale }} search={search} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function HomeLink({ locale, hash, className, children, onClick }: Props & { locale: Locale; hash?: string }) {
  if (locale === "en") {
    return (
      <Link to="/" hash={hash} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <Link to="/$locale" params={{ locale }} hash={hash} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function ExampleLink({ locale, className, children, onClick }: Props & { locale: Locale }) {
  if (locale === "en") {
    return (
      <Link to="/example" className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <Link to="/$locale/example" params={{ locale }} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

/** Plan landing pages are English-only for now — no locale variant. */
export function PlanLink({
  slug,
  className,
  children,
  onClick,
}: Props & { slug?: string }) {
  if (!slug) {
    return (
      <Link to="/plans" className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <Link to="/plans/$slug" params={{ slug }} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function SourcesLink({ locale, className, children, onClick }: Props & { locale: Locale }) {
  if (locale === "en") {
    return (
      <Link to="/sources" className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <Link to="/$locale/sources" params={{ locale }} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function FieldLink({ locale, className, children, onClick }: Props & { locale: Locale }) {
  if (locale === "en") {
    return (
      <Link to="/field" className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <Link to="/$locale/field" params={{ locale }} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
