import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meisie",
  description: "Where women rise together. Connect, collaborate, and conquer in a community that celebrates you",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>

    
        {children}
   
  </>;
}
