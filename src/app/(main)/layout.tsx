import YapperNavBar from "@/components/yapper-nav-bar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <YapperNavBar />
      {children}
    </>
  );
}
