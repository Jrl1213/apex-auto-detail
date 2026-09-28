# APEX Auto Detail

A responsive, single-page website for a **fictional Malaysian automotive detailing studio**. This is a small-business design demo, not an operating business; its contact details, prices, reviews, and imagery are illustrative.

## Features and stack

- Service and package sections, FAQs, and a keyboard-accessible before/after slider
- Responsive mobile navigation, WhatsApp quote links, and Google Maps directions from the configured address
- Next.js 16 App Router, React 19, TypeScript, CSS, and local images served with `next/image`

There is no backend, booking system, or analytics integration.

## Run locally

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. Run `npm run typecheck` and `npm run build` for production checks; `npm run start` serves the build locally.

## Configuration and real-world use

Business details, packages, FAQs, reviews, and WhatsApp link generation live in `src/config/business.ts`. Page copy and metadata live in `src/app/page.tsx` and `src/app/layout.tsx`; generated demo images live in `public/images/`.

Before using this for a real business, verify and replace the placeholder WhatsApp number and active quote links, fictional address and hours, sample prices, fictional reviews, and generated images. Use licensed or permissioned customer material, update the related disclaimers and metadata, and remove the demo `noindex, nofollow` setting only when the real details are ready. The directions link automatically uses the configured address.
