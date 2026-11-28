// 🗂️ Webサービスのカタログと検索・絞り込みの純粋ロジック。
// カードの並びと文言は旧静的サイト（index.html）のカードグリッドと同一に保つ。

export type CategoryId = "kurashi" | "gazou" | "uranai" | "asobi";

export interface Category {
  id: CategoryId;
  label: string;
}

export interface Service {
  category: CategoryId;
  name: string;
  description: string;
  url: string;
  /** カードに表示する URL 表記（リンク先と異なる場合がある） */
  urlLabel: string;
}

export const CATEGORIES: Category[] = [
  { id: "kurashi", label: "くらし・実用" },
  { id: "gazou", label: "画像・投稿づくり" },
  { id: "uranai", label: "占い・診断" },
  { id: "asobi", label: "抽選・ゲーム・遊び" },
];

export type CategoryFilter = CategoryId | "all";

export const SERVICES: Service[] = [
  // 🏠 くらし・実用
  { category: "kurashi", name: "防災情報Web", description: "地震・天気をひと目で確認できる防災情報サイト。", url: "https://bosai.vercel.app/", urlLabel: "bosai.vercel.app" },
  { category: "kurashi", name: "電車の運行情報ページ", description: "高崎線と大宮・高崎の関連路線の運行情報をまとめたページ。", url: "https://densha.vercel.app/info/", urlLabel: "densha.vercel.app/info/" },
  { category: "kurashi", name: "サーバーステータス", description: "運用中の Bot サーバーの稼働状況を公開するページ。", url: "https://sabasute.vercel.app/", urlLabel: "sabasute.vercel.app" },
  { category: "kurashi", name: "環境音ミキサー", description: "雨・電車・カフェなどの音を合成して重ね掛けできる作業用BGM。", url: "https://otoya.vercel.app/", urlLabel: "otoya.vercel.app" },
  { category: "kurashi", name: "タイピング練習", description: "ローマ字入力の速度と正確さを測るタイピングゲーム。", url: "https://taipingu.vercel.app/", urlLabel: "taipingu.vercel.app" },
  { category: "kurashi", name: "集中タイマー", description: "ポモドーロタイマーと集中時間の記録。", url: "https://shuchuya.vercel.app/", urlLabel: "shuchuya.vercel.app" },
  { category: "kurashi", name: "QRコードメーカー", description: "URLやテキストからQRコードを作って保存できるツール。", url: "https://qruya.vercel.app/", urlLabel: "qruya.vercel.app" },
  { category: "kurashi", name: "席替えツール", description: "座席表に名前をランダムで割り当てる席替えツール。", url: "https://sekiya.vercel.app/", urlLabel: "sekiya.vercel.app" },
  { category: "kurashi", name: "パスワード生成", description: "推測されにくいパスワードを端末の中だけで生成するツール。", url: "https://pasuya.vercel.app/", urlLabel: "pasuya.vercel.app" },
  // 🖼️ 画像・投稿づくり
  { category: "gazou", name: "Quote画像メーカー", description: "発言を引用風の画像にできるメーカー。", url: "https://miaq.vercel.app/", urlLabel: "miaq.vercel.app" },
  { category: "gazou", name: "Fake Tweetメーカー", description: "X風の投稿カード画像を作れるメーカー。", url: "https://nisetsui.vercel.app/", urlLabel: "nisetsui.vercel.app" },
  { category: "gazou", name: "架空プロフィール生成器", description: "ランダム生成したプロフィールをカード画像に。", url: "https://kakupro.vercel.app/", urlLabel: "kakupro.vercel.app" },
  { category: "gazou", name: "ドキュメント書き込み", description: "PDFや画像の上にペンや文字で書き込めるツール。", url: "https://dokukaki.vercel.app/", urlLabel: "dokukaki.vercel.app" },
  { category: "gazou", name: "画像モザイク・ぼかし", description: "投稿前に、画像の見せたくない部分を隠せる加工ツール。", url: "https://mozaya.vercel.app/", urlLabel: "mozaya.vercel.app" },
  { category: "gazou", name: "カラーパレット", description: "画像から色を抽出したり、配色を作ったりできるツール。", url: "https://iropare.vercel.app/", urlLabel: "iropare.vercel.app" },
  // 🔮 占い・診断
  { category: "uranai", name: "診断メーカー", description: "名前を入れて楽しむ診断。結果はカード画像で共有可能。", url: "https://shindanya.vercel.app/", urlLabel: "shindanya.vercel.app" },
  { category: "uranai", name: "おみくじ・今日の運勢", description: "日替わりの運勢とラッキーアイテム。連続訪問の記録つき。", url: "https://mikuji.vercel.app/", urlLabel: "mikuji.vercel.app" },
  // 🎲 抽選・ゲーム・遊び
  { category: "asobi", name: "話題ガチャ", description: "会話のネタに困ったときの話題ガチャ。", url: "https://wadaiya.vercel.app/", urlLabel: "wadaiya.vercel.app" },
  { category: "asobi", name: "あみだくじメーカー", description: "参加者と結果を入れるだけであみだくじを自動生成。", url: "https://amidaya.vercel.app/", urlLabel: "amidaya.vercel.app" },
  { category: "asobi", name: "ルーレットメーカー", description: "項目を入れて回せる汎用ルーレット。設定の共有も可能。", url: "https://ruletto.vercel.app/", urlLabel: "ruletto.vercel.app" },
  { category: "asobi", name: "暗号・謎解きメーカー", description: "暗号化ツールと、謎解き問題カードの作成。", url: "https://nazoya.vercel.app/", urlLabel: "nazoya.vercel.app" },
  { category: "asobi", name: "ミニゲーム集", description: "反射神経・色違い当て・数字記憶の3本セット。", url: "https://chibigame.vercel.app/", urlLabel: "chibigame.vercel.app" },
  { category: "asobi", name: "抽選ツール", description: "参加者リストから複数人をまとめて抽選できるツール。", url: "https://kujiya.vercel.app/", urlLabel: "kujiya.vercel.app" },
  { category: "asobi", name: "グループ分けツール", description: "参加者リストをグループに自動で振り分けるツール。", url: "https://wakeya.vercel.app/", urlLabel: "wakeya.vercel.app" },
];

/**
 * 検索の照合対象テキスト。旧サイトではカード要素の textContent
 * （名前＋説明＋URL表記）に対して部分一致で判定していたので、それに合わせる。
 */
export function serviceSearchText(service: Service): string {
  return `${service.name}${service.description}${service.urlLabel}`.toLowerCase();
}

export function matchesService(service: Service, filter: CategoryFilter, query: string = ""): boolean {
  const matchesCategory = filter === "all" || service.category === filter;
  const normalizedQuery = query.trim().toLowerCase();
  const matchesQuery = normalizedQuery === "" || serviceSearchText(service).includes(normalizedQuery);
  return matchesCategory && matchesQuery;
}

export interface ServiceGroup {
  category: Category;
  services: Service[];
}

/**
 * 絞り込み結果をカテゴリごとにまとめる。旧サイトの挙動に合わせ、
 * 表示できるカードが1件もないカテゴリは見出しごと返さない。
 */
export function groupVisibleServices(
  services: Service[],
  filter: CategoryFilter,
  query: string,
): { groups: ServiceGroup[]; visibleCount: number } {
  const groups: ServiceGroup[] = [];
  let visibleCount = 0;
  for (const category of CATEGORIES) {
    const visible = services.filter(
      (service) => service.category === category.id && matchesService(service, filter, query),
    );
    if (visible.length > 0) {
      groups.push({ category, services: visible });
      visibleCount += visible.length;
    }
  }
  return { groups, visibleCount };
}
