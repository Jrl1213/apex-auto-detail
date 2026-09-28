export function Brand({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label="APEX Auto Detail"
    >
      <span className="brand-mark" aria-hidden="true">
        <span />
      </span>
      <span className="brand-words">
        <strong>APEX</strong>
        <small>AUTO DETAIL</small>
      </span>
    </span>
  );
}
