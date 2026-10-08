type ServiceIconName = "exterior" | "interior" | "correction" | "coating";

export function ServiceIcon({ name }: { name: ServiceIconName }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {name === "exterior" && (
        <>
          <circle cx="16" cy="16" r="11" />
          <circle cx="16" cy="16" r="3" />
          <path d="M16 5v8m0 6v8M5 16h8m6 0h8M8.2 8.2l5.7 5.7m4.2 4.2 5.7 5.7M8.2 23.8l5.7-5.7m4.2-4.2 5.7-5.7" />
        </>
      )}
      {name === "interior" && (
        <>
          <path d="M10 5h6v6h-6zM10 11l-2 10h13l3 6H6l-2-5 3-11h3ZM17 14l3 7M7 27v2m16-2v2" />
        </>
      )}
      {name === "correction" && (
        <>
          <path d="M8 19h16v5H8zM5 25h22M12 19v-5h10v5M15 14V9h7v5M8 17H5v5h3M6 6v5m-2.5-2.5h5M27 8v5m-2.5-2.5h5" />
        </>
      )}
      {name === "coating" && (
        <>
          <path d="m16 3 10 4v9c0 6-10 13-10 13S6 22 6 16V7l10-4Z" />
          <path d="M16 10c-2 3-4 5-4 7a4 4 0 0 0 8 0c0-2-2-4-4-7Z" />
        </>
      )}
    </svg>
  );
}
