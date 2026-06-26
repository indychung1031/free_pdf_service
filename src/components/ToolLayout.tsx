type ToolLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function ToolLayout({ title, description, children }: ToolLayoutProps) {
  return (
    <div className="min-h-full bg-zinc-50 text-zinc-900">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm leading-6 text-zinc-600">{description}</p>
        </header>
        {children}
      </div>
    </div>
  );
}
