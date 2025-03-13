"use client";

import { CONFIG } from "@/config-global";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// ----------------------------------------------------------------------

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push(CONFIG.auth.redirectPath);
  }, [router]);

  return null;
}
