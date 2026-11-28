"use client";

import { useEffect, useState } from "react";

/**
 * `prefers-reduced-motion: reduce` の設定を購読する。
 * 初期値は false（旧サイトの JS と同じく、判定できない環境では通常表示にする）。
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
