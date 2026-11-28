import { describe, expect, it } from "vitest";
import {
  CATEGORIES,
  SERVICES,
  groupVisibleServices,
  matchesService,
  serviceSearchText,
} from "@/lib/services";

describe("service catalog", () => {
  it("contains 24 services", () => {
    expect(SERVICES).toHaveLength(24);
  });

  it("has the same per-category counts as the static site (9 / 6 / 2 / 7)", () => {
    const counts = CATEGORIES.map(
      (category) => SERVICES.filter((service) => service.category === category.id).length,
    );
    expect(counts).toEqual([9, 6, 2, 7]);
  });

  it("keeps every service name unique", () => {
    const names = SERVICES.map((service) => service.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("links every service to its vercel.app URL shown on the card", () => {
    for (const service of SERVICES) {
      expect(service.url.endsWith("/")).toBe(true);
      expect(service.url).toContain(service.urlLabel.replace(/\/$/, ""));
    }
  });
});

describe("matchesService", () => {
  const bosai = SERVICES[0];

  it("matches everything with filter=all and an empty query", () => {
    expect(matchesService(bosai, "all", "")).toBe(true);
    expect(matchesService(bosai, "all", "   ")).toBe(true);
  });

  it("filters by category", () => {
    expect(matchesService(bosai, "kurashi")).toBe(true);
    expect(matchesService(bosai, "asobi")).toBe(false);
  });

  it("searches across name, description and URL label, case-insensitively", () => {
    expect(matchesService(bosai, "all", "防災")).toBe(true);
    expect(matchesService(bosai, "all", "BOSAI")).toBe(true);
    expect(matchesService(bosai, "all", "地震")).toBe(true);
    expect(matchesService(bosai, "all", "ルーレット")).toBe(false);
  });

  it("combines category and query", () => {
    expect(matchesService(bosai, "kurashi", "防災")).toBe(true);
    expect(matchesService(bosai, "asobi", "防災")).toBe(false);
  });
});

describe("serviceSearchText", () => {
  it("joins name, description and URL label in lower case", () => {
    const service = SERVICES.find((s) => s.name === "QRコードメーカー");
    expect(serviceSearchText(service!)).toBe(
      "qrコードメーカーurlやテキストからqrコードを作って保存できるツール。qruya.vercel.app",
    );
  });
});

describe("groupVisibleServices", () => {
  it("returns all four groups and 24 services without filtering", () => {
    const { groups, visibleCount } = groupVisibleServices(SERVICES, "all", "");
    expect(groups.map((group) => group.category.id)).toEqual(["kurashi", "gazou", "uranai", "asobi"]);
    expect(visibleCount).toBe(24);
  });

  it("drops groups with no visible cards, like the static site hid empty headings", () => {
    const { groups, visibleCount } = groupVisibleServices(SERVICES, "uranai", "");
    expect(groups.map((group) => group.category.id)).toEqual(["uranai"]);
    expect(visibleCount).toBe(2);
  });

  it("returns no groups when nothing matches the query", () => {
    const { groups, visibleCount } = groupVisibleServices(SERVICES, "all", "存在しないサービス");
    expect(groups).toEqual([]);
    expect(visibleCount).toBe(0);
  });

  it("keeps the catalog order inside each group", () => {
    const { groups } = groupVisibleServices(SERVICES, "all", "メーカー");
    const gazou = groups.find((group) => group.category.id === "gazou");
    expect(gazou?.services.map((service) => service.name)).toEqual([
      "Quote画像メーカー",
      "Fake Tweetメーカー",
    ]);
  });
});
