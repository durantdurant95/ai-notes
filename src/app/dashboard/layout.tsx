import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 flex-col">
        <Header />
        <div className="p-4">
          <SidebarTrigger />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
