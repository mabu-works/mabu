"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  phase: number;
}

/**
 * 背景の演出レイヤー: 漂うオーロラ3枚と、瞬く粒子のキャンバス。
 * 粒子は画面面積に応じて最大70個まで。タブが裏のときは描画を止める。
 * 動きを減らす設定では粒子を描かない（オーロラも CSS 側で止まる）。
 */
export function BackgroundFx() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const count = Math.min(70, Math.floor((width * height) / 26000));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.8 + 0.4,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.12 - 0.05,
          a: Math.random() * 0.5 + 0.15,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = (ts: number) => {
      if (!document.hidden) {
        ctx.clearRect(0, 0, width, height);
        const light = document.documentElement.getAttribute("data-theme") === "light";
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -4) p.x = width + 4;
          if (p.x > width + 4) p.x = -4;
          if (p.y < -4) p.y = height + 4;
          if (p.y > height + 4) p.y = -4;
          const twinkle = 0.65 + 0.35 * Math.sin(ts / 1400 + p.phase);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = light
            ? `rgba(70, 100, 190, ${p.a * twinkle * 0.55})`
            : `rgba(170, 195, 255, ${p.a * twinkle})`;
          ctx.fill();
        }
      }
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    frame = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]);

  return (
    <div className="bg-fx" aria-hidden="true">
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="aurora aurora-c" />
      <canvas ref={canvasRef} className="bg-canvas" />
    </div>
  );
}
