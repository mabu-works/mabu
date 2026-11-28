import { describe, expect, it } from "vitest";
import { NEWS_LIMIT, formatNewsDate, newsLinkLabel, parseNewsItems } from "@/lib/news";

describe("parseNewsItems", () => {
  it("sorts by date descending and keeps the newest 5 items", () => {
    const data = {
      items: [
        { date: "2026-11-18", text: "古い" },
        { date: "2026-11-28", text: "最新" },
        { date: "2026-11-20", text: "中間" },
        { date: "2026-11-25", text: "二番目" },
        { date: "2026-11-22", text: "三番目" },
        { date: "2026-11-21", text: "四番目" },
      ],
    };
    const items = parseNewsItems(data);
    expect(items).toHaveLength(NEWS_LIMIT);
    expect(items.map((item) => item.text)).toEqual(["最新", "二番目", "三番目", "四番目", "中間"]);
  });

  it("drops items without a date or text", () => {
    const data = {
      items: [
        { date: "2026-11-20", text: "有効" },
        { date: "2026-11-21" },
        { text: "日付なし" },
        { date: "", text: "空の日付" },
        null,
        "文字列",
      ],
    };
    expect(parseNewsItems(data).map((item) => item.text)).toEqual(["有効"]);
  });

  it("returns an empty array for malformed payloads", () => {
    expect(parseNewsItems(null)).toEqual([]);
    expect(parseNewsItems("news")).toEqual([]);
    expect(parseNewsItems({})).toEqual([]);
    expect(parseNewsItems({ items: "x" })).toEqual([]);
  });

  it("keeps link and linkLabel only when they are non-empty strings", () => {
    const data = {
      items: [
        { date: "2026-11-20", text: "a", link: "https://example.com/", linkLabel: "開く" },
        { date: "2026-11-19", text: "b", link: 42, linkLabel: "" },
      ],
    };
    const [first, second] = parseNewsItems(data);
    expect(first.link).toBe("https://example.com/");
    expect(first.linkLabel).toBe("開く");
    expect(second.link).toBeUndefined();
    expect(second.linkLabel).toBeUndefined();
  });
});

describe("formatNewsDate", () => {
  it("renders ISO dates with slashes", () => {
    expect(formatNewsDate("2026-11-20")).toBe("2026/11/20");
  });
});

describe("newsLinkLabel", () => {
  it("prefers the label and falls back to the URL", () => {
    expect(newsLinkLabel({ date: "2026-11-20", text: "x", link: "https://a.example/", linkLabel: "ラベル" })).toBe("ラベル");
    expect(newsLinkLabel({ date: "2026-11-20", text: "x", link: "https://a.example/" })).toBe("https://a.example/");
    expect(newsLinkLabel({ date: "2026-11-20", text: "x" })).toBeNull();
  });
});
