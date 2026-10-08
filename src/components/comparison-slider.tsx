"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export function ComparisonSlider() {
  const [position, setPosition] = useState(50);
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
        className="comparison-stage"
        style={{ "--position": `${position}%` } as React.CSSProperties}
        onPointerDown={(event) => {
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
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Compare before and after detailing images"
          aria-valuetext={`${position}% after image visible`}
        />
      </div>
      <p className="comparison-hint">
        Drag the handle to compare <span aria-hidden="true">↔</span>
      </p>
    </div>
  );
}
