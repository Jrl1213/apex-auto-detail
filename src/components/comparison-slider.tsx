"use client";

import { useState } from "react";
import Image from "next/image";

export function ComparisonSlider() {
  const [position, setPosition] = useState(50);

  return (
    <div className="comparison">
      <div
        className="comparison-stage"
        style={{ "--position": `${position}%` } as React.CSSProperties}
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
