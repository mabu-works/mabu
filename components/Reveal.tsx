"use client";

import { createElement, type CSSProperties, type ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";

interface RevealProps {
  /** 描画する要素（既定は div） */
  as?: string;
  /** 同じまとまりの中での並び順。カード等はこの順に少しずつ遅れて現れる */
  index?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [attribute: string]: unknown;
}

/** スクロールでふわりと現れるラッパー。挙動は useReveal フックに集約している。 */
export function Reveal({ as = "div", index, className, style, children, ...attributes }: RevealProps) {
  const ref = useReveal<HTMLElement>(index);
  return createElement(as, { ...attributes, ref, className, style }, children);
}
