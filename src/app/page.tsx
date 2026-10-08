import Image from "next/image";
import { Brand } from "@/components/brand";
import { ComparisonSlider } from "@/components/comparison-slider";
import { SiteHeader } from "@/components/site-header";
import { ServiceIcon } from "@/components/service-icon";
import {
  business,
  directionsUrl,
  faqs,
  packages,
  reasons,
  reviews,
  services,
  whatsAppUrl,
} from "@/config/business";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <Image
            src="/images/hero.png"
            alt="Dark grey sedan in a professional detailing studio"
            fill
            priority
            sizes="100vw"
            className="hero-image"
          />
          <div className="hero-shade" />
          <div className="container hero-content">
            <p className="eyebrow eyebrow-light">
              <span className="eyebrow-line" /> Detail is in the difference
            </p>
            <h1 id="hero-title">
              A better finish.
              <br />
              <em>A better feeling.</em>
            </h1>
            <p className="hero-copy">
              Thoughtful detailing for the cars you care about. Clean, protect
              and enjoy every drive.
            </p>
            <div className="hero-actions">
              <a
                className="button button-primary"
                href={whatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get a quote <Arrow diagonal />
              </a>
              <a className="button button-outline" href="#packages">
                View packages <Arrow />
              </a>
            </div>
          </div>
          <div className="container hero-bottom">
            <span>{business.locality}</span>
            <span className="hero-bottom-rule" />
            <span>By appointment</span>
            <a href="#services" aria-label="Scroll to services">
              Explore what we do <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section
          id="services"
          className="section services-section"
          aria-labelledby="services-title"
        >
          <div className="container">
            <div className="section-heading heading-split">
              <div>
                <p className="eyebrow">
                  <span className="eyebrow-line" /> What we do
                </p>
                <h2 id="services-title">
                  Care for every
                  <br />
                  <em>surface.</em>
                </h2>
              </div>
              <p>
                From a proper maintenance detail to a more complete reset, every
                service starts with a look at your car and an honest
                conversation.
              </p>
            </div>
            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.number}>
                  <div className="service-top">
                    <span>{service.number} / 04</span>
                    <span className="service-icon" aria-hidden="true">
                      <ServiceIcon name={service.icon} />
                    </span>
                  </div>
                  <div className="service-media">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 600px) calc(100vw - 88px), (max-width: 850px) calc((100vw - 158px) / 2), (max-width: 1100px) calc((100vw - 190px) / 2), (max-width: 1520px) calc((100vw - 298px) / 4), 306px"
                      className="service-image"
                    />
                    <span className="service-image-label">Demo visual</span>
                  </div>
                  <div className="service-copy">
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                  </div>
                  <div className="service-detail">{service.detail}</div>
                </article>
              ))}
            </div>
            <p className="service-visual-note">
              Generated demo visuals for illustration; not customer work.
            </p>
          </div>
        </section>

        <section
          id="results"
          className="section results-section"
          aria-labelledby="results-title"
        >
          <div className="container results-grid">
            <div className="results-copy">
              <p className="eyebrow eyebrow-light">
                <span className="eyebrow-line" /> The difference
              </p>
              <h2 id="results-title">
                See what
                <br />
                <em>care can do.</em>
              </h2>
              <p>
                A considered process brings clarity back to the finish. Slide
                across this illustrative demo to explore the kind of change
                careful detailing can make.
              </p>
              <div className="results-note">
                <span className="note-icon">↗</span>
                <span>
                  Real results depend on paint condition and the service
                  selected. Images are generated demo visuals, not customer
                  work.
                </span>
              </div>
            </div>
            <ComparisonSlider />
          </div>
        </section>

        <section
          id="packages"
          className="section packages-section"
          aria-labelledby="packages-title"
        >
          <div className="container">
            <div className="section-heading packages-heading">
              <p className="eyebrow">
                <span className="eyebrow-line" /> Packages
              </p>
              <h2 id="packages-title">
                A good place <em>to start.</em>
              </h2>
              <p>
                Choose a direction. We’ll tailor the final recommendation to
                your vehicle, its condition and the result you want.
              </p>
            </div>
            <div className="packages-grid">
              {packages.map((item) => (
                <article
                  className={`package-card ${item.featured ? "featured" : ""}`}
                  key={item.name}
                >
                  <div className="package-top">
                    <span>
                      {item.featured ? "Most comprehensive" : "Detail package"}
                    </span>
                    <span className="package-cross" aria-hidden="true">
                      ✳
                    </span>
                  </div>
                  <h3>{item.name}</h3>
                  <p className="package-blurb">{item.blurb}</p>
                  <div className="package-price">
                    <span>From</span>
                    <strong>{item.price}</strong>
                    <small>sample starting price</small>
                  </div>
                  <div className="package-includes-title">What’s included</div>
                  <ul>
                    {item.includes.map((feature) => (
                      <li key={feature}>
                        <span aria-hidden="true">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="package-bottom">
                    <span>{item.note}</span>
                    <a
                      href={whatsAppUrl(item.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Request a quote for ${item.name}`}
                    >
                      Request quote <Arrow diagonal />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <p className="price-disclaimer">
              Demo starting prices in RM. Final pricing varies with vehicle
              size, condition and required work. A tailored quote is provided
              before any service.
            </p>
          </div>
        </section>

        <section
          id="about"
          className="section about-section"
          aria-labelledby="about-title"
        >
          <div className="container about-layout">
            <div className="about-intro">
              <p className="eyebrow eyebrow-light">
                <span className="eyebrow-line" /> Why APEX
              </p>
              <h2 id="about-title">
                Good work
                <br />
                shows in the <em>details.</em>
              </h2>
              <p>
                We believe the best result comes from careful prep, clear
                expectations and the time to do the job properly.
              </p>
            </div>
            <div className="reasons-list">
              {reasons.map((reason) => (
                <div className="reason" key={reason.number}>
                  <span>{reason.number}</span>
                  <div>
                    <h3>{reason.title}</h3>
                    <p>{reason.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section reviews-section"
          aria-labelledby="reviews-title"
        >
          <div className="container">
            <div className="reviews-heading">
              <div>
                <p className="eyebrow">
                  <span className="eyebrow-line" /> From the driver’s seat
                </p>
                <h2 id="reviews-title">
                  The experience <em>matters.</em>
                </h2>
              </div>
              <p>
                Sample customer stories for this demo. Replace with genuine,
                permissioned reviews before launch.
              </p>
            </div>
            <div className="reviews-grid">
              {reviews.map((review) => (
                <figure className="review-card" key={review.name}>
                  <div className="quote-mark" aria-hidden="true">
                    “
                  </div>
                  <blockquote>{review.quote}</blockquote>
                  <figcaption>
                    <strong>{review.name}</strong>
                    <span>{review.car} · fictional sample review</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="section contact-section"
          aria-labelledby="contact-title"
        >
          <div className="container contact-layout">
            <div className="contact-intro">
              <p className="eyebrow">
                <span className="eyebrow-line" /> Find us
              </p>
              <h2 id="contact-title">
                Your next detail
                <br />
                <em>starts here.</em>
              </h2>
              <p>
                Based in {business.locality}. Message us with your car and the
                service you have in mind, and we’ll help you choose the right
                next step.
              </p>
              <a
                className="text-link"
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions <Arrow diagonal />
              </a>
            </div>
            <div className="contact-panel">
              <div>
                <span className="contact-label">Studio address</span>
                <address>{business.address}</address>
                <small>{business.addressNote}</small>
              </div>
              <div>
                <span className="contact-label">Opening hours</span>
                <dl>
                  {business.hours.map((entry) => (
                    <div key={entry.days}>
                      <dt>{entry.days}</dt>
                      <dd>{entry.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <span className="contact-label">WhatsApp</span>
                <a
                  className="contact-phone"
                  href={whatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {business.whatsAppDisplay} <Arrow diagonal />
                </a>
                <small>{business.whatsAppNote}</small>
              </div>
            </div>
          </div>
        </section>

        <section className="section faq-section" aria-labelledby="faq-title">
          <div className="container faq-layout">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-line" /> Good to know
              </p>
              <h2 id="faq-title">
                Before you
                <br />
                <em>book.</em>
              </h2>
              <p>A few useful answers before we get started.</p>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details key={faq.q}>
                  <summary>
                    <span className="faq-index">0{index + 1}</span>
                    <span>{faq.q}</span>
                    <span className="faq-plus" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="cta-title">
          <div className="container final-cta-inner">
            <div>
              <p className="eyebrow eyebrow-light">
                <span className="eyebrow-line" /> Ready when you are
              </p>
              <h2 id="cta-title">
                Let’s bring out
                <br />
                <em>your car’s best.</em>
              </h2>
              <p>
                Tell us your car model, what you’re considering and your
                preferred date. We’ll take it from there.
              </p>
            </div>
            <a
              className="button button-primary cta-button"
              href={whatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Request a quote on WhatsApp <Arrow diagonal />
            </a>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-main">
          <div>
            <a href="#top" aria-label="APEX Auto Detail, back to top">
              <Brand light />
            </a>
            <p>Thoughtful automotive detailing in {business.locality}.</p>
          </div>
          <div className="footer-nav">
            <a href="#services">Services</a>
            <a href="#packages">Packages</a>
            <a href="#results">Results</a>
            <a href="#about">Why APEX</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-contact">
            <span>Let’s talk about your car.</span>
            <a href={whatsAppUrl()} target="_blank" rel="noopener noreferrer">
              Start a conversation <Arrow diagonal />
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} {business.name}. Demo website.
          </span>
          <span>Fictional business details and imagery for presentation.</span>
        </div>
      </footer>
    </>
  );
}
