import Footer from "@/layout/user/Footer";
import HomePage from "@/layout/user/HomePage";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <HomePage/>
      {children}
      <Footer />
    </div>
  );
}
