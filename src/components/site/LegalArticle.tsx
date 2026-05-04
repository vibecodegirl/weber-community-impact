import type { LegalSection } from "@/content/legal";

type Doc = {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalArticle({ doc }: { doc: Doc }) {
  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">Legal</div>
          <h1 className="font-serif text-4xl md:text-5xl">{doc.title}</h1>
          <p className="mt-4 text-primary-foreground/70">{doc.lastUpdated}</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
        <p className="text-muted-foreground">{doc.intro}</p>
        {doc.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mt-10 font-serif text-2xl text-primary">{section.heading}</h2>
            {section.blocks.map((block, i) =>
              block.type === "p" ? (
                <p key={i} className="mt-4 text-muted-foreground">{block.text}</p>
              ) : (
                <ul key={i} className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                  {block.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              )
            )}
          </section>
        ))}
      </article>
    </>
  );
}
