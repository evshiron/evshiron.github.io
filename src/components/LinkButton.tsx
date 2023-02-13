import Link from "next/link";
import { PropsWithChildren } from "react";

export default function LinkButton(
  props: PropsWithChildren<{
    href: string;
    target?: string;
  }>
) {
  return (
    <Link
      className="form-input rounded-md border-none px-8 py-2 shadow-md outline-none transition hover:bg-sky-900 hover:text-white hover:duration-300"
      href={props.href}
      target={props.target}
    >
      {props.children}
    </Link>
  );
}
