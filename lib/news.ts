// 📰 お知らせ（news.json）の整形ロジック。旧 app.js の表示規則を純粋関数にしたもの。

export interface NewsItem {
  date: string;
  text: string;
  link?: string;
  linkLabel?: string;
}

/** お知らせとして表示する最大件数（旧サイトと同じ直近5件） */
export const NEWS_LIMIT = 5;

function isNewsItem(value: unknown): value is NewsItem {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.date === "string" &&
    item.date !== "" &&
    typeof item.text === "string" &&
    item.text !== ""
  );
}

/**
 * news.json の内容から表示用のお知らせを取り出す。
 * date と text を持つ項目だけを残し、日付の新しい順に並べて先頭 NEWS_LIMIT 件を返す。
 * 形が不正な入力は空配列にする（呼び出し側は空表示にフォールバックする）。
 */
export function parseNewsItems(data: unknown, limit: number = NEWS_LIMIT): NewsItem[] {
  if (typeof data !== "object" || data === null) return [];
  const items = (data as { items?: unknown }).items;
  if (!Array.isArray(items)) return [];
  return items
    .filter(isNewsItem)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .slice(0, limit)
    .map((item) => {
      const result: NewsItem = { date: item.date, text: item.text };
      if (typeof item.link === "string" && item.link !== "") result.link = item.link;
      if (typeof item.linkLabel === "string" && item.linkLabel !== "") result.linkLabel = item.linkLabel;
      return result;
    });
}

/** "2026-11-20" → "2026/11/20"（旧サイトの日付表示） */
export function formatNewsDate(date: string): string {
  return date.replace(/-/g, "/");
}

/** リンクの表示文字列。ラベルがなければ URL 自体を出す（旧サイトと同じ） */
export function newsLinkLabel(item: NewsItem): string | null {
  if (!item.link) return null;
  return item.linkLabel ?? item.link;
}
