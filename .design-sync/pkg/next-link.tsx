import { forwardRef } from "react";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { prefetch: _prefetch, replace: _replace, scroll: _scroll, ...props },
  ref,
) {
  return <a ref={ref} {...props} />;
});

export default Link;
