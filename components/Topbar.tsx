import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#news", label: "お知らせ" },
  { href: "#services", label: "Webサービス" },
  { href: "#community", label: "コミュニティ" },
  { href: "#links", label: "リンク集" },
];

/** 画面上部に固定されるナビゲーションバー。テーマ切り替えだけがクライアント側。 */
export function Topbar() {
  return (
    <nav className="topbar">
      <div className="topbar-in">
        <a className="brand" href="#top">
          まぶ <span className="brand-en">/ Mabu</span>
        </a>
        <span className="topbar-links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </span>
      </div>
    </nav>
  );
}
