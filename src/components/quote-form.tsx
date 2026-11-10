"use client";

import { useEffect, useState } from "react";
import { services, whatsAppMessageUrl } from "@/config/business";
import {
  buildQuoteEnquiryMessage,
  preferredDateHint,
  quoteConcerns,
  todayIso,
  undecidedService,
  validateQuoteEnquiry,
  type QuoteEnquiry,
  type QuoteErrors,
} from "@/lib/quote-enquiry";

export function QuoteForm() {
  const [ready, setReady] = useState(false);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [draftUrl, setDraftUrl] = useState("");
  // Set after hydration, because the page is pre-rendered and "today" depends on the visitor.
  const [minDate, setMinDate] = useState<string>();

  // Keep the browser from submitting field values as a GET before hydration.
  useEffect(() => {
    setReady(true);
    setMinDate(todayIso());
  }, []);

  function submitQuote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const enquiry: QuoteEnquiry = {
      car: String(data.get("car") ?? ""),
      service: String(data.get("service") ?? ""),
      date: String(data.get("date") ?? ""),
      concern: String(data.get("concern") ?? ""),
      details: String(data.get("details") ?? ""),
    };
    const nextErrors = validateQuoteEnquiry(enquiry);
    setErrors(nextErrors);
    setDraftUrl("");
    const firstInvalidField = Object.keys(nextErrors)[0];
    if (firstInvalidField) {
      const field = event.currentTarget.elements.namedItem(firstInvalidField);
      if (field instanceof HTMLElement) field.focus();
      return;
    }

    const url = whatsAppMessageUrl(buildQuoteEnquiryMessage(enquiry));
    setDraftUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function clearFeedback(event: React.FormEvent<HTMLFormElement>) {
    setDraftUrl("");
    const name = (event.target as HTMLInputElement).name as keyof QuoteEnquiry;
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  return (
    <form
      id="quote-form"
      tabIndex={-1}
      className="quote-form"
      aria-labelledby="quote-title"
      noValidate
      autoComplete="off"
      onSubmit={submitQuote}
      onChange={clearFeedback}
    >
      <div className="quote-heading">
        <h3 id="quote-title">Get a quote</h3>
        <p>Tell us about your car. Fields marked * are required.</p>
      </div>
      <div className="quote-field">
        <label htmlFor="quote-car">Car make &amp; model *</label>
        <input
          id="quote-car"
          name="car"
          type="text"
          required
          maxLength={100}
          placeholder="e.g. Honda Civic FE"
          aria-invalid={Boolean(errors.car)}
          aria-describedby={errors.car ? "quote-car-error" : undefined}
        />
        {errors.car && (
          <p className="quote-error" id="quote-car-error" role="alert">
            {errors.car}
          </p>
        )}
      </div>
      <div className="quote-field">
        <label htmlFor="quote-service">
          Service you&apos;re interested in *
        </label>
        <select
          id="quote-service"
          name="service"
          required
          defaultValue=""
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? "quote-service-error" : undefined}
        >
          <option value="" disabled>
            Choose a service
          </option>
          {services.map((service) => (
            <option key={service.name} value={service.name}>
              {service.name}
            </option>
          ))}
          <option value={undecidedService}>{undecidedService}</option>
        </select>
        {errors.service && (
          <p className="quote-error" id="quote-service-error" role="alert">
            {errors.service}
          </p>
        )}
      </div>
      <div className="quote-field">
        <label htmlFor="quote-date">
          Preferred date <span>(optional)</span>
        </label>
        <input
          id="quote-date"
          name="date"
          type="date"
          min={minDate}
          aria-invalid={Boolean(errors.date)}
          aria-describedby={`quote-date-hint${errors.date ? " quote-date-error" : ""}`}
        />
        <p className="quote-field-hint" id="quote-date-hint">
          {preferredDateHint()}
        </p>
        {errors.date && (
          <p className="quote-error" id="quote-date-error" role="alert">
            {errors.date}
          </p>
        )}
      </div>
      <div className="quote-field">
        <label htmlFor="quote-concern">
          What would you like to improve? <span>(optional)</span>
        </label>
        <select
          id="quote-concern"
          name="concern"
          defaultValue=""
          aria-invalid={Boolean(errors.concern)}
          aria-describedby={errors.concern ? "quote-concern-error" : undefined}
        >
          <option value="">Choose an option</option>
          {quoteConcerns.map((concern) => (
            <option key={concern} value={concern}>
              {concern}
            </option>
          ))}
        </select>
        {errors.concern && (
          <p className="quote-error" id="quote-concern-error" role="alert">
            {errors.concern}
          </p>
        )}
      </div>
      <div className="quote-field quote-details">
        <label htmlFor="quote-details">
          Anything else? <span>(optional)</span>
        </label>
        <textarea
          id="quote-details"
          name="details"
          rows={3}
          maxLength={1000}
          placeholder="Tell us a little more about your car..."
          aria-invalid={Boolean(errors.details)}
          aria-describedby={`quote-details-hint${errors.details ? " quote-details-error" : ""}`}
        />
        <p className="quote-field-hint" id="quote-details-hint">
          Up to 1,000 characters.
        </p>
        {errors.details && (
          <p className="quote-error" id="quote-details-error" role="alert">
            {errors.details}
          </p>
        )}
      </div>
      <div className="quote-submit">
        <button
          className="button button-primary"
          type="submit"
          disabled={!ready}
        >
          Continue to WhatsApp <span aria-hidden="true">↗</span>
        </button>
        <p>
          Messages reach Jarrell, who built this demo. Review your draft before
          sending; nothing is sent automatically.
        </p>
        <noscript>
          <p>
            Enable JavaScript to prepare a quote, or use the direct WhatsApp
            link.
          </p>
        </noscript>
      </div>
      {draftUrl && (
        <div className="quote-status" role="status">
          <p>Your draft is ready to review in WhatsApp.</p>
          <a href={draftUrl} target="_blank" rel="noopener noreferrer">
            WhatsApp didn&apos;t open? Open your draft ↗
          </a>
        </div>
      )}
    </form>
  );
}
