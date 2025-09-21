export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex h-screen bg-gray-900">{children}</div>;
}
