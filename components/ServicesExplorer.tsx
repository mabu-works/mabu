"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  CATEGORIES,
  SERVICES,
  groupVisibleServices,
  type CategoryFilter,
  type Service,
} from "@/lib/services";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useReveal } from "@/lib/useReveal";
import { Reveal } from "./Reveal";

const FILTERS: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "すべて" },
  ...CATEGORIES.map((category) => ({ id: category.id as CategoryFilter, label: category.label })),
];

/**
 * Webサービス一覧: 検索ボックス＋カテゴリチップで絞り込む。
 * 絞り込みのたびに、表示されるカードが波のようにポップインする
 * （検索は180msデバウンス、チップは即時）。動きを減らす設定ではポップしない。
 */
export function ServicesExplorer() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [popRound, setPopRound] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const debounceRef = useRef<number | undefined>(undefined);

  const { groups, visibleCount } = useMemo(
    () => groupVisibleServices(SERVICES, filter, query),
    [filter, query],
  );

  // 表示中のカードの通し番号。ポップインの遅延はこの順に付ける
  const positions = useMemo(() => {
    const map = new Map<string, number>();
    let position = 0;
    for (const group of groups) {
      for (const service of group.services) {
        map.set(service.name, position);
        position += 1;
      }
    }
    return map;
  }, [groups]);

  const schedulePop = (immediate: boolean) => {
    if (reducedMotion) return;
    window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(
      () => setPopRound((round) => round + 1),
      immediate ? 30 : 180,
    );
  };

  useEffect(() => () => window.clearTimeout(debounceRef.current), []);

  return (
    <>
      <div className="service-tools">
        <input
          type="search"
          className="service-search"
          placeholder="サービス名やキーワードで検索"
          aria-label="Webサービスを検索"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            schedulePop(false);
          }}
        />
        <div className="chip-row" role="group" aria-label="カテゴリで絞り込み">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === filter ? "chip is-active" : "chip"}
              onClick={() => {
                setFilter(item.id);
                schedulePop(true);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {groups.map((group) => (
        <div key={group.category.id}>
          <Reveal as="h3" className="service-cat">
            {group.category.label}
          </Reveal>
          <div className="card-grid">
            {group.services.map((service, index) => (
              <ServiceCard
                key={service.name}
                service={service}
                index={index}
                popPosition={popRound > 0 ? positions.get(service.name) : undefined}
                popRound={popRound}
              />
            ))}
          </div>
        </div>
      ))}

      {visibleCount === 0 && (
        <p className="section-lead">条件に合うサービスが見つかりませんでした。</p>
      )}
    </>
  );
}

interface ServiceCardProps {
  service: Service;
  /** カテゴリ内での並び順（出現演出の遅延に使う） */
  index: number;
  /** 全表示カードの中での通し番号（ポップインの遅延に使う） */
  popPosition?: number;
  /** ポップインの世代。変わるたびにアニメーションを再生する */
  popRound: number;
}

function ServiceCard({ service, index, popPosition, popRound }: ServiceCardProps) {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useReveal<HTMLAnchorElement>(index);
  const frameRef = useRef<number | null>(null);
  const poppedRoundRef = useRef(0);

  // 🔎 絞り込みのたびに、表示中のカードを波のようにポップさせる（旧サイトと同じ張り直し方式）
  useEffect(() => {
    if (popRound === 0 || popRound === poppedRoundRef.current) return;
    poppedRoundRef.current = popRound;
    const card = ref.current;
    if (!card || reducedMotion || popPosition === undefined) return;
    card.classList.remove("pop");
    // アニメーションを再生するために一度リフローを挟む
    void card.offsetWidth;
    card.style.animationDelay = `${Math.min(popPosition, 10) * 0.04}s`;
    card.classList.add("pop");
  }, [popRound, popPosition, reducedMotion, ref]);

  // 🃏 マウス追随スポットライト＋3Dチルト（細いポインタの環境だけ）
  const handlePointerMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (reducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (frameRef.current) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
      card.style.setProperty("--my", `${(y / rect.height) * 100}%`);
      const tiltX = ((y / rect.height) - 0.5) * -5;
      const tiltY = ((x / rect.width) - 0.5) * 5;
      card.classList.add("tilting");
      card.style.transform =
        `perspective(700px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-3px)`;
    });
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    event.currentTarget.style.transform = "";
    event.currentTarget.classList.remove("tilting");
  };

  return (
    <a
      ref={ref}
      className="card"
      href={service.url}
      target="_blank"
      rel="noopener"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <span className="card-url">{service.urlLabel}</span>
    </a>
  );
}
