import { business, services } from "@/config/business";

export const undecidedService = "Not sure yet — help me choose";
export const quoteConcerns = [
  "General cleaning",
  "Dull paint / swirl marks",
  "Interior stains / odours",
  "Paint protection",
  "Other / Not sure",
] as const;

export type QuoteEnquiry = {
  car: string;
  service: string;
  date: string; // "YYYY-MM-DD" from the date picker, or "" when skipped.
  concern: string;
  details: string;
};

export type QuoteErrors = Partial<Record<keyof QuoteEnquiry, string>>;

/** Hint for the date field, built from the opening hours, e.g. "Closed on Sundays. …" */
export function preferredDateHint() {
  const closed = business.hours
    .filter((entry) => entry.time === "Closed")
    // "Sunday" -> "Sundays"; leaves other wording, like "Public holidays", as is.
    .map((entry) => entry.days.replace(/day$/, "days"));
  const confirm = "We'll confirm availability in our reply.";
  return closed.length
    ? `Closed on ${closed.join(" and ")}. ${confirm}`
    : confirm;
}

/** Today's date as "YYYY-MM-DD" in the visitor's own time zone. */
export function todayIso(now = new Date()) {
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function parseIsoDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [year, month, day] = match.slice(1).map(Number);
  const date = new Date(year, month - 1, day);
  // Rejects dates like 2026-02-31, which Date would roll into March.
  return date.getMonth() === month - 1 && date.getDate() === day ? date : null;
}

/** "2026-11-15" -> "Sun, 15 Nov 2026" */
export function formatPreferredDate(value: string) {
  const date = parseIsoDate(value);
  return date
    ? date.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : value;
}

export function validateQuoteEnquiry(enquiry: QuoteEnquiry): QuoteErrors {
  const errors: QuoteErrors = {};
  if (!enquiry.car.trim()) {
    errors.car = "Please enter your car make and model.";
  } else if (enquiry.car.length > 100) {
    errors.car = "Keep your car make and model to 100 characters or fewer.";
  }
  if (
    enquiry.service !== undecidedService &&
    !services.some((service) => service.name === enquiry.service)
  ) {
    errors.service = "Please choose a service, or let us help you choose.";
  }
  if (enquiry.date) {
    // ISO dates compare correctly as plain strings.
    if (!parseIsoDate(enquiry.date)) {
      errors.date = "Please choose a valid date, or leave it blank.";
    } else if (enquiry.date < todayIso()) {
      errors.date = "Please choose today or a later date.";
    }
  }
  if (
    enquiry.concern &&
    !quoteConcerns.some((concern) => concern === enquiry.concern)
  ) {
    errors.concern = "Please choose one of the listed options.";
  }
  if (enquiry.details.length > 1000) {
    errors.details = "Keep additional details to 1,000 characters or fewer.";
  }
  return errors;
}

export function buildQuoteEnquiryMessage(enquiry: QuoteEnquiry) {
  return [
    `Hi ${business.shortName}! I'd like to get a quote.`,
    "",
    `Car: ${enquiry.car.trim()}`,
    `Service: ${enquiry.service}`,
    ...(enquiry.date
      ? [`Preferred date: ${formatPreferredDate(enquiry.date)}`]
      : []),
    ...(enquiry.concern ? [`Main concern: ${enquiry.concern}`] : []),
    ...(enquiry.details.trim()
      ? [`Additional details: ${enquiry.details.trim()}`]
      : []),
    "",
    "Please let me know what you would recommend. Thank you!",
  ].join("\n");
}
