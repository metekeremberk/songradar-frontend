import Friends from "@/components/sidebar/Friends";
import Sidebar from "@/components/sidebar/Sidebar";

export default function RootLayout({ children }) {
  return (
    <div className="flex h-full w-full justify-between">
      <Sidebar />
      {children}
      {/* <Friends /> */}
    </div>
  );
}
