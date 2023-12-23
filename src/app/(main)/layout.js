import Sidebar from "@/components/sidebar/Sidebar";

export default function RootLayout({ children }) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
