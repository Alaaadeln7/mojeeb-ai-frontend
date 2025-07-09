// components/ui/typography.tsx
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ElementType } from "react";

type TypographyProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & ComponentPropsWithoutRef<T>;

function Typography<T extends ElementType = "p">({
  as,
  className,
  ...props
}: TypographyProps<T>) {
  const Component = as || "p";
  return <Component className={cn(className)} {...props} />;
}

export function TypographyH1(props: TypographyProps<"h1">) {
  return (
    <Typography
      as="h1"
      className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      {...props}
    />
  );
}

export function TypographyP(props: TypographyProps<"p">) {
  return (
    <Typography
      as="p"
      className="leading-7 [&:not(:first-child)]:mt-6"
      {...props}
    />
  );
}
