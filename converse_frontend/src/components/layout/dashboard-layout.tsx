export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 overflow-y-auto bg-background focus:outline-none">
        {children}
      </main>
    </div>
  );
}