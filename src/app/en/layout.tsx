export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="en" className="contents">
      {children}
    </div>
  );
}
