"use client";

import { useEffect } from "react";

/**
 * ページ内リンクのスムーズスクロール補助。
 * CSS の scroll-behavior が効かない環境向けに、旧サイトと同じ挙動を付ける
 * （対象へスムーズにスクロールし、URL のハッシュだけを差し替える）。
 */
export function AnchorScroll() {
  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    const handlers = new Map<HTMLAnchorElement, (event: MouseEvent) => void>();
    links.forEach((link) => {
      const handler = (event: MouseEvent) => {
        const id = link.getAttribute("href");
        if (id && id.length > 1) {
          const target = document.querySelector(id);
          if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            history.replaceState(null, "", id);
          }
        }
      };
      handlers.set(link, handler);
      link.addEventListener("click", handler);
    });
    return () => {
      handlers.forEach((handler, link) => link.removeEventListener("click", handler));
    };
  }, []);

  return null;
}
