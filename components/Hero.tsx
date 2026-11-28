import { CountUp } from "./CountUp";

const STATS = [
  { target: 24, suffix: "", label: "Webサービス" },
  { target: 60, suffix: "+", label: "GitHubリポジトリ" },
  { target: 4, suffix: "", label: "運用サーバー" },
];

const HERO_NAV = [
  { href: "#about", label: "About" },
  { href: "#news", label: "お知らせ" },
  { href: "#services", label: "Webサービス" },
  { href: "#community", label: "コミュニティ" },
  { href: "#links", label: "リンク集" },
];

/**
 * ヒーロー。名前の文字が1文字ずつ立ち上がり、流れるグラデーションで表示される。
 * 統計は画面に入るとカウントアップする（CountUp）。
 */
export function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-badge">Mabu</div>
        <h1 className="hero-name">
          <span className="hero-char">ま</span>
          <span className="hero-char">ぶ</span>
        </h1>
        <p className="hero-tagline">個人で Web サービスや Bot、アプリを作っています。</p>
        <p className="hero-place">群馬県在住</p>
        <div className="hero-stats">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat">
              <CountUp target={stat.target} suffix={stat.suffix} />
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
        <nav className="hero-nav" aria-label="ページ内リンク">
          {HERO_NAV.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
