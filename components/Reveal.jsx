"use client";
import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, className = "", delay = 0, from = "up", as: Tag = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    // NOTE: no blanket timeout fallback here. A timer would fire for EVERY
    // Reveal on the page — including below-the-fold sections — marking them
    // "in" before the user ever scrolls to them, so the animation plays
    // off-screen and there's nothing left to see on arrival. The
    // `IntersectionObserver === undefined` guard above already covers the only
    // case where content could get stuck hidden (no IO support at all).
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-from={from}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${shown ? "in" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
