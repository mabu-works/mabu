"use client";

import { useEffect, useState } from "react";

/** フッターの年表示。初期値はサイトの表記年に合わせ、表示後に現在の年へ更新する。 */
export function CurrentYear() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <span>{year}</span>;
}
