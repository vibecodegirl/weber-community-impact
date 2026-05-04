export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ember">
          {eyebrow}
        </div>
      )}
      <h2 className="text-balance text-3xl leading-tight md:text-4xl lg:text-5xl">{title}</h2>
      {description && (
        <p className="mt-4 text-pretty text-base text-muted-foreground md:text-lg">{description}</p>
      )}
    </div>
  );
}
