interface HeadingProps {
  title: string;
  description?: string;
  className?: string;
}

export function Heading({ title, description, className }: HeadingProps) {
  return (
    <div className={className}>
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
