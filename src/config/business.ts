/** Replace the sample details here before using this site for a real studio. */
export const business = {
  name: "APEX Auto Detail",
  shortName: "APEX",
  descriptor: "Automotive detailing studio",
  locality: "Petaling Jaya, Selangor",
  address:
    "Unit 12, Jalan Contoh 3, Sample Industrial Park, 46000 Petaling Jaya, Selangor",
  addressNote: "Fictional sample address — replace before launch.",
  whatsAppNumber: "60123456789", // Placeholder only. Replace before launch.
  whatsAppDisplay: "+60 12-345 6789",
  whatsAppNote: "Demo WhatsApp number — replace before launch.",
  hours: [
    { days: "Monday – Friday", time: "9:00 am – 6:00 pm" },
    { days: "Saturday", time: "9:00 am – 5:00 pm" },
    { days: "Sunday", time: "Closed" },
  ],
} as const;

export function quoteMessage(service = "") {
  return [
    "Hi APEX, I'd like to get a detailing quote.",
    "",
    "Car model:",
    `Service interested in: ${service}`,
    "Preferred date:",
  ].join("\n");
}

export function whatsAppUrl(service = "") {
  return `https://wa.me/${business.whatsAppNumber}?text=${encodeURIComponent(quoteMessage(service))}`;
}

export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;

export const services = [
  {
    number: "01",
    name: "Exterior Detailing",
    description:
      "A careful wash, decontamination and finishing process that restores clarity and leaves your paint feeling clean.",
    detail: "Wash · decontaminate · protect",
  },
  {
    number: "02",
    name: "Interior Detailing",
    description:
      "A thorough reset for the cabin, from hard-to-reach trim to seats, carpets and high-touch surfaces.",
    detail: "Deep clean · refresh · finish",
  },
  {
    number: "03",
    name: "Paint Correction",
    description:
      "Machine polishing tailored to your paint, designed to reduce visible swirls and improve depth and gloss.",
    detail: "Inspect · refine · restore",
  },
  {
    number: "04",
    name: "Ceramic Coating",
    description:
      "A durable protective finish applied after proper preparation, making routine care more straightforward.",
    detail: "Prepare · coat · maintain",
  },
] as const;

export const packages = [
  {
    name: "Essential Detail",
    price: "RM 280",
    blurb: "A considered refresh for a car that needs to feel its best again.",
    includes: [
      "Exterior hand wash & decontamination",
      "Wheels, tyres & exterior trim",
      "Interior vacuum & wipe-down",
      "Finishing spray protection",
    ],
    note: "Typically half a day",
    featured: false,
  },
  {
    name: "Full Detail",
    price: "RM 680",
    blurb:
      "The complete inside-and-out treatment for a more substantial reset.",
    includes: [
      "Everything in Essential",
      "Interior deep clean",
      "Single-stage paint enhancement",
      "Longer-lasting paint sealant",
    ],
    note: "Typically 1–2 days",
    featured: true,
  },
  {
    name: "Ceramic Protection",
    price: "RM 1,800",
    blurb: "Thorough preparation and a protective coating for easier upkeep.",
    includes: [
      "Detailed wash & paint prep",
      "Paint correction assessment",
      "Ceramic coating application",
      "Aftercare guidance",
    ],
    note: "Typically 2–3 days",
    featured: false,
  },
] as const;

export const reasons = [
  {
    number: "01",
    title: "Time for the details",
    text: "We work by appointment so each vehicle gets a focused, unhurried process.",
  },
  {
    number: "02",
    title: "The right recommendation",
    text: "We explain what your car needs, what can wait, and what a service can realistically achieve.",
  },
  {
    number: "03",
    title: "Products with purpose",
    text: "Our methods and products are chosen for the surface and the result, not for a flashy label.",
  },
  {
    number: "04",
    title: "Care beyond collection",
    text: "You leave with simple aftercare advice to help keep the finish looking good.",
  },
] as const;

export const reviews = [
  {
    quote:
      "The car felt properly refreshed inside and out. The team explained what they found and what was worth doing next.",
    name: "Aiman R.",
    car: "Sedan owner",
  },
  {
    quote:
      "Easy to arrange, clear about timing, and the finish looked fantastic when I picked it up.",
    name: "Mei L.",
    car: "SUV owner",
  },
  {
    quote:
      "I appreciated the honest advice on the paintwork. The results were noticeable without any overselling.",
    name: "Daniel T.",
    car: "Hatchback owner",
  },
] as const;

export const faqs = [
  {
    q: "How long does a detail take?",
    a: "An Essential Detail is usually completed within half a day. Full Detail and coating work can take one to three days depending on the vehicle and the preparation needed. We confirm timing with your quote.",
  },
  {
    q: "Do I need an appointment?",
    a: "Yes. We work by appointment so we can allow the right amount of time for your car. Message us with your vehicle model and preferred date to get started.",
  },
  {
    q: "Is ceramic coating right for every car?",
    a: "A coating can make washing and maintenance easier, but it is not a substitute for proper paint preparation or regular care. We assess the paint first and recommend an approach that suits its condition.",
  },
  {
    q: "Should I do anything before bringing my car in?",
    a: "Please remove valuables and personal items from the cabin. You do not need to wash the car beforehand; seeing its current condition helps us recommend the right work.",
  },
  {
    q: "Why can the final price differ from the starting price?",
    a: "Vehicle size, paint condition, interior soiling and the level of correction required all affect the time involved. The prices shown are sample starting prices; we provide a tailored quote before work begins.",
  },
] as const;
