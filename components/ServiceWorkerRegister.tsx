"use client";

import { useEffect } from "react";

/** Service Worker（public/sw.js）をページ読み込み後に登録する。 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const register = () => {
      navigator.serviceWorker.register("sw.js").catch(() => {
        // 登録できない環境では通常の静的サイトとして動作する
      });
    };
    if (document.readyState === "complete") {
      register();
      return;
    }
    window.addEventListener("load", register);
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
