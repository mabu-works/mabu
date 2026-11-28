"use client";

import { useEffect, useRef } from "react";

/**
 * スクロール出現演出（旧サイトの IntersectionObserver 演出）を要素に付けるフック。
 * 要素が画面に入ったら .revealed を付けて一度だけ表示する。
 * 動きを減らす設定か IntersectionObserver が無い環境では最初から表示する。
 *
 * @param index 同じまとまりの中での並び順。カード等はこの順に少しずつ遅れて現れる
 */
export function useReveal<T extends HTMLElement>(index?: number) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let reduced = false;
    try {
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      // 判定できない環境では通常表示にする
    }

    if (reduced || !("IntersectionObserver" in window)) {
      element.classList.add("revealed");
      return;
    }

    // 同じ行・同じまとまりの要素は少しずつ遅らせて波のように出す（上限8件分）
    if (index !== undefined) {
      element.style.setProperty("--d", `${Math.min(index, 8) * 0.06}s`);
    }
    element.classList.add("reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [index]);

  return ref;
}
