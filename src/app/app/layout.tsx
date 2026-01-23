// Layout for app, all subroutes
// Show top bar, show group chats on left
import { ThreadSelector } from "@/components/app/ThreadSelector";
import { AppNavBar } from "@/components/app/AppNavBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex h-screen flex-col">
        <AppNavBar />
        <div className="flex flex-1 overflow-hidden">
          <ThreadSelector />
          <main className="border-pumpkin-spice-300 m-2 min-h-0 flex-1 rounded-md border-3">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
