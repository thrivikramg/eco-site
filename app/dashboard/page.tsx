"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/inventory");
  }, [router]);

  return (
    <div className="p-8 text-gray-500 text-center">Redirecting to inventory...</div>
  );
}
