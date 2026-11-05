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
  concern: string;
  details: string;
};

export type QuoteErrors = Partial<Record<keyof QuoteEnquiry, string>>;

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
    ...(enquiry.concern ? [`Main concern: ${enquiry.concern}`] : []),
    ...(enquiry.details.trim()
      ? [`Additional details: ${enquiry.details.trim()}`]
      : []),
    "",
    "Please let me know what you would recommend. Thank you!",
  ].join("\n");
}
