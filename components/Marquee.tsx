const MARQUEE_ITEMS = [
  "防災情報Web",
  "環境音ミキサー",
  "タイピング練習",
  "集中タイマー",
  "QRコードメーカー",
  "席替えツール",
  "Quote画像メーカー",
  "Fake Tweetメーカー",
  "診断メーカー",
  "おみくじ",
  "話題ガチャ",
  "あみだくじ",
  "ルーレット",
  "ミニゲーム集",
  "まぶ鯖",
  "AEGIS",
];

/**
 * サービス名のマーキー帯。同じ内容を2つ並べて継ぎ目なく無限スクロールさせる
 * （旧サイトでは JS で複製していたものを、最初から2組描画する形にした）。
 * ホバーで一時停止し、両端はマスクでフェードする（CSS 側）。
 */
export function Marquee() {
  const text = `${MARQUEE_ITEMS.join(" ✦ ")} ✦\u00A0`;
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span className="marquee-group">{text}</span>
        <span className="marquee-group">{text}</span>
      </div>
    </div>
  );
}
