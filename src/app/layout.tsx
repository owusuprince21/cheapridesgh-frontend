// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import './globals.css';
// import Navbar from '@/components/Navbar';
// import { AuthProvider } from '@/context/AuthContext';
// import Footer from '@/components/Footer';
// import { Toaster } from '@/components/ui/toast';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Cheap Rides Gh - Quality Used Cars in Ghana',
//   description: 'Find quality used cars at unbeatable prices in Ghana. Your dream car is just a click away!',
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <AuthProvider>
//           {/* ✅ Now Navbar can safely use useAuth() */}
//           <Navbar />
          
//           {children}
//           {/* <Footer /> */}
//           <Toaster />
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }

// src/app/layout.tsx
"use client";

import "./globals.css";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // small delay for smoothness
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {loading && <Loader />}
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
