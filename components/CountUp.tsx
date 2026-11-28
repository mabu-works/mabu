"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

interface CountUpProps {
  /** カウントアップの到達値 */
  target: number;
  /** 到達時に付ける接尾辞（例: "+"） */
  suffix?: string;
}

/**
 * ヒーロー統計のカウントアップ。画面に入ったら1.4秒かけて
 * イージング（ease-out cubic）で数え上げる。
 * 動きを減らす設定か IntersectionObserver が無い環境では即値表示にする。
 */
export function CountUp({ target, suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      setValue(target);
      setFinished(true);
      return;
    }

    let frame = 0;
    const run = () => {
      const duration = 1400;
      let started: number | null = null;
      const step = (ts: number) => {
        if (started === null) started = ts;
        const t = Math.min(1, (ts - started) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(target * eased));
        if (t < 1) {
          frame = window.requestAnimationFrame(step);
        } else {
          setFinished(true);
        }
      };
      frame = window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            run();
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [target, reducedMotion]);

  return (
    <span ref={ref} className="stat-num">
      {value}
      {finished ? suffix : ""}
    </span>
  );
}
