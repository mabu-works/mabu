"use client";

import { useEffect, useState } from "react";
import { formatNewsDate, newsLinkLabel, parseNewsItems, type NewsItem } from "@/lib/news";

/**
 * お知らせセクション。本文はサーバーコンポーネント側にあり、
 * このコンポーネントは見出しの下にリストだけを差し込む。
 * news.json（public/ に同梱され、そのまま配信される正本）を読み込み、
 * 新しい順に直近5件まで表示する。取得できない・0件のときは空表示にする。
 */
export function NewsList() {
  const [items, setItems] = useState<NewsItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("news.json", { cache: "no-cache" })
      .then((response) => {
        if (!response.ok) throw new Error("news.json fetch failed");
        return response.json();
      })
      .then((data: unknown) => {
        if (!cancelled) setItems(parseNewsItems(data));
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (items === null) {
    return <ul className="news-list" />;
  }

  if (items.length === 0) {
    return (
      <>
        <ul className="news-list" />
        <p className="section-lead">お知らせはまだありません。</p>
      </>
    );
  }

  return (
    <ul className="news-list">
      {items.map((item, index) => {
        const label = newsLinkLabel(item);
        return (
          <li key={`${item.date}-${index}`} className="news-item">
            <time className="news-date" dateTime={item.date}>
              {formatNewsDate(item.date)}
            </time>
            <div className="news-body">
              <p>{item.text}</p>
              {item.link && label && (
                <a href={item.link} target="_blank" rel="noopener">
                  {label}
                </a>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
