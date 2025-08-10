
"use client";

import Link from "next/link";
import { Shield } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AccessDenied() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 10000); // 5 seconds

    return () => clearTimeout(timer); // cleanup if user navigates earlier
  }, [router]);

  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
        <Shield className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-yellow-800 mb-2">
          Access Denied
        </h1>
        <p className="text-yellow-700 mb-6">
          You don't have permission to access this page.  
          <br />
          Redirecting you to the homepage in{" "}
          <span className="font-bold">5 seconds...</span>
        </p>
        <Link
          href="/"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Go Back Home Now
        </Link>
      </div>
    </div>
  );
}
