"use client";

import { useEffect, useState } from "react";
import {
  THEME_STORAGE_KEY,
  isTheme,
  nextTheme,
  resolveInitialTheme,
  themeToggleIcon,
  type Theme,
} from "@/lib/theme";

/**
 * ダーク／ライトの切り替えボタン。
 * 初期テーマは表示前の初期化スクリプトが <html data-theme> に入れた値を正とし、
 * 切り替え結果は localStorage（キー mabu-theme）に保存する。
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const applied = document.documentElement.getAttribute("data-theme");
    setTheme(isTheme(applied) ? applied : resolveInitialTheme(readSavedTheme()));
  }, []);

  const toggle = () => {
    const next = nextTheme(theme);
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // 保存できなくても切り替え自体は有効
    }
  };

  return (
    <button type="button" className="theme-toggle" aria-label="テーマ切り替え" onClick={toggle}>
      {themeToggleIcon(theme)}
    </button>
  );
}

function readSavedTheme(): string | null {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}
