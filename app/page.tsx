import { AnchorScroll } from "@/components/AnchorScroll";
import { BackgroundFx } from "@/components/BackgroundFx";
import { CurrentYear } from "@/components/CurrentYear";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { NewsList } from "@/components/NewsList";
import { Reveal } from "@/components/Reveal";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { ServicesExplorer } from "@/components/ServicesExplorer";
import { Topbar } from "@/components/Topbar";

const LINK_LIST = [
  { href: "https://x.com/xx_mabu_xx", label: "X", value: "@xx_mabu_xx" },
  { href: "https://github.com/i-mabu", label: "GitHub（個人）", value: "github.com/i-mabu" },
  { href: "https://github.com/mabu-works", label: "GitHub（mabu-works）", value: "github.com/mabu-works" },
  { href: "https://github.com/mabu-bots", label: "GitHub（mabu-bots）", value: "github.com/mabu-bots" },
  { href: "https://github.com/aegis-app", label: "GitHub（aegis-app）", value: "github.com/aegis-app" },
  { href: "https://mabusaba.vercel.app", label: "まぶ鯖 公式サイト", value: "mabusaba.vercel.app" },
];

const DEV_LINKS = [
  { href: "https://github.com/i-mabu", label: "GitHub（個人）", primary: true },
  { href: "https://github.com/mabu-works", label: "GitHub（mabu-works）", primary: false },
  { href: "https://github.com/mabu-bots", label: "GitHub（mabu-bots）", primary: false },
  { href: "https://github.com/aegis-app", label: "GitHub（aegis-app）", primary: false },
];

export default function HomePage() {
  return (
    <>
      <BackgroundFx />
      <ScrollProgress />
      <Topbar />

      <Hero />
      <Marquee />

      <main>
        <Reveal as="section" id="about" className="section">
          <h2 className="section-title">About</h2>
          <p>はじめまして、まぶ（Mabu）です。個人開発で Web サービス・Discord Bot・Android アプリを作って、運営しています。</p>
          <p>「あったら便利」「使って楽しい」を形にするのが好きで、作ったものはこのサイトにまとめています。どれもブラウザだけで動くので、気になったものから気軽に触ってみてください。</p>
        </Reveal>

        <Reveal as="section" id="news" className="section">
          <h2 className="section-title">お知らせ</h2>
          <NewsList />
        </Reveal>

        <Reveal as="section" id="services" className="section">
          <h2 className="section-title">Webサービス</h2>
          <p className="section-lead">個人開発した Web サービスの一覧です。すべてブラウザだけで動きます（インストール・登録不要）。</p>
          <ServicesExplorer />
        </Reveal>

        <Reveal as="section" id="community" className="section">
          <h2 className="section-title">コミュニティ</h2>
          <Reveal className="feature-box">
            <h3>まぶ鯖</h3>
            <p>Discord の公開コミュニティ「まぶ鯖」を運営しています。雑談・ゲーム・音楽・画像や動画の共有など、ゆるく交流できる場所です。ROM専・初見さんも歓迎です。</p>
            <div className="button-row">
              <a className="button" href="https://mabusaba.vercel.app" target="_blank" rel="noopener">
                公式サイト
              </a>
              <a className="button button-sub" href="https://discord.gg/GKkW4wCAVp" target="_blank" rel="noopener">
                Discord に参加
              </a>
              <a className="button button-sub" href="https://x.com/mabu_saba" target="_blank" rel="noopener">
                公式X @mabu_saba
              </a>
            </div>
          </Reveal>
        </Reveal>

        <Reveal as="section" id="dev" className="section">
          <h2 className="section-title">その他の開発</h2>
          <p>Web サービスのほか、Discord Bot や Android アプリの開発もしています。コードは GitHub で公開しています。</p>
          <div className="button-row">
            {DEV_LINKS.map((link) => (
              <a
                key={link.href}
                className={link.primary ? "button" : "button button-sub"}
                href={link.href}
                target="_blank"
                rel="noopener"
              >
                {link.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal as="section" id="links" className="section">
          <h2 className="section-title">リンク集</h2>
          <ul className="link-list">
            {LINK_LIST.map((link, index) => (
              <Reveal as="li" key={link.href} index={index}>
                <a href={link.href} target="_blank" rel="noopener">
                  <span className="link-label">{link.label}</span>
                  <span className="link-value">{link.value}</span>
                </a>
              </Reveal>
            ))}
          </ul>
        </Reveal>
      </main>

      <footer className="footer">
        <p>
          © <CurrentYear /> まぶ
        </p>
      </footer>

      <AnchorScroll />
      <ServiceWorkerRegister />
    </>
  );
}
