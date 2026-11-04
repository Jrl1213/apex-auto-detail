"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function ComparisonSlider() {
  const [position, setPosition] = useState(50);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const demoPlayed = useRef(false);
  const hasInteracted = useRef(false);

  function cancelDemo() {
    hasInteracted.current = true;
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }

  useEffect(() => {
    const stage = stageRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!stage || motion.matches || demoPlayed.current) return;

    let disposed = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.5) return;
        observer.disconnect();
        if (hasInteracted.current || demoPlayed.current) return;
        demoPlayed.current = true;

        // Show the demonstration only once both image layers can be painted.
        void Promise.all(
          Array.from(stage.querySelectorAll("img"), (image) =>
            image.decode().catch(() => undefined),
          ),
        ).then(() => {
          if (
            disposed ||
            hasInteracted.current ||
            motion.matches ||
            document.hidden
          )
            return;
          let started: number | null = null;
          const ease = (progress: number) =>
            progress * progress * (3 - 2 * progress);

          function animate(now: number) {
            if (disposed || hasInteracted.current) return;
            started ??= now;
            const elapsed = now - started;
            // Reveal more of the clean finish, pause briefly, then settle near centre.
            const next =
              elapsed < 1200
                ? 50 + 28 * ease(elapsed / 1200)
                : elapsed < 1350
                  ? 78
                  : 78 - 22 * ease(Math.min((elapsed - 1350) / 1050, 1));
            setPosition(next);
            frameRef.current =
              elapsed < 2400 ? requestAnimationFrame(animate) : null;
          }
          frameRef.current = requestAnimationFrame(animate);
        });
      },
      { threshold: 0.5 },
    );

    const handleMotionChange = () => {
      if (motion.matches) cancelDemo();
    };
    const handleVisibilityChange = () => {
      if (document.hidden && demoPlayed.current) cancelDemo();
    };
    observer.observe(stage);
    motion.addEventListener("change", handleMotionChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      disposed = true;
      observer.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      motion.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Keep horizontal touch dragging when the browser handles vertical panning.
  const touchGesture = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    direction: "pending" | "horizontal" | "vertical";
  } | null>(null);

  function endTouchGesture(event: React.PointerEvent<HTMLDivElement>) {
    if (touchGesture.current?.pointerId === event.pointerId) {
      touchGesture.current = null;
    }
  }

  return (
    <div className="comparison">
      <div
        ref={stageRef}
        className="comparison-stage"
        onFocusCapture={cancelDemo}
        onKeyDownCapture={cancelDemo}
        style={{ "--position": `${position}%` } as React.CSSProperties}
        onPointerDown={(event) => {
          cancelDemo();
          if (event.pointerType !== "touch") return;
          touchGesture.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            direction: "pending",
          };
        }}
        onPointerMove={(event) => {
          const gesture = touchGesture.current;
          if (!gesture || gesture.pointerId !== event.pointerId) return;

          const deltaX = event.clientX - gesture.startX;
          const deltaY = event.clientY - gesture.startY;
          if (
            gesture.direction === "pending" &&
            Math.max(Math.abs(deltaX), Math.abs(deltaY)) >= 8
          ) {
            gesture.direction =
              Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
          }
          if (gesture.direction !== "horizontal") return;

          const { left, width } = event.currentTarget.getBoundingClientRect();
          setPosition(
            Math.round(
              Math.max(
                0,
                Math.min(100, ((event.clientX - left) / width) * 100),
              ),
            ),
          );
        }}
        onPointerUp={endTouchGesture}
        onPointerCancel={endTouchGesture}
      >
        <Image
          src="/images/result-before.png"
          alt="Demo image of a grey car before detailing, with a duller and dirtier finish"
          fill
          sizes="(max-width: 900px) 100vw, 65vw"
          className="comparison-image"
        />
        <div className="comparison-after">
          <Image
            src="/images/result-after.png"
            alt="Demo image of a grey car after detailing, with a clean, glossy finish"
            fill
            sizes="(max-width: 900px) 100vw, 65vw"
            className="comparison-image"
          />
        </div>
        <span className="comparison-label before-label">BEFORE</span>
        <span className="comparison-label after-label">AFTER</span>
        <div className="comparison-divider" aria-hidden="true">
          <span className="comparison-handle">
            ‹ <b>›</b>
          </span>
        </div>
        <input
          className="comparison-range"
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => {
            cancelDemo();
            setPosition(Number(event.target.value));
          }}
          aria-label="Compare before and after detailing images"
          aria-valuetext={`${Math.round(position)}% after image visible`}
        />
      </div>
      <p className="comparison-hint">
        Drag the handle to compare <span aria-hidden="true">↔</span>
      </p>
    </div>
  );
}
