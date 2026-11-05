import { business } from "@/config/business";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label={business.name}
    >
      <span className="brand-mark" aria-hidden="true">
        <span />
      </span>
      <span className="brand-words">
        <strong>{business.shortName.toUpperCase()}</strong>
        <small>{business.brandLine.toUpperCase()}</small>
      </span>
    </span>
  );
}
