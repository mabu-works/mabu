// 🎨 テーマ（ダーク／ライト）の解決ロジック。localStorage のキーと既定値は旧サイトと同一。

export type Theme = "light" | "dark";

/** テーマを保存する localStorage のキー（旧サイトから引き継ぎ） */
export const THEME_STORAGE_KEY = "mabu-theme";

/**
 * 保存済みテーマから初期テーマを決める。
 * "light" が保存されているときだけライト、それ以外（未保存・"dark"・不正値）は
 * ダークを既定にする（旧サイトの初期化スクリプトと同じ規則）。
 */
export function resolveInitialTheme(saved: string | null | undefined): Theme {
  return saved === "light" ? "light" : "dark";
}

/** 保存値として有効なテーマかどうか（初期化スクリプトが data-theme を尊重する条件） */
export function isTheme(value: string | null | undefined): value is Theme {
  return value === "light" || value === "dark";
}

/** トグルで切り替えたあとのテーマ */
export function nextTheme(current: Theme): Theme {
  return current === "light" ? "dark" : "light";
}

/** トグルボタンのアイコン。ライト時は太陽、ダーク時は月（旧サイトと同じ） */
export function themeToggleIcon(theme: Theme): string {
  return theme === "light" ? "☀️" : "🌙";
}

/**
 * ページ表示前に実行する初期化スクリプト。
 * 保存済みテーマを <html data-theme> に反映し、描画のちらつきを防ぐ。
 * localStorage が使えない環境では何もせず、ダークが既定になる。
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`;
