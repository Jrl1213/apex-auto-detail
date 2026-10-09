# APEX Auto Detail: from an idea to a working website

[Explore the live demo](https://apex-auto-detail-demo.netlify.app/) · [Back to the project](../README.md)

The part I am proudest of is seeing an idea become a website that people can actually open and use. APEX started as a fictional Malaysian detailing studio. It became a complete demo that I could share, review on my laptop, and test on my own phone.

## Starting with the visitor

I did not come into this project with experience in car detailing. That made a simple question useful: would someone unfamiliar with the subject understand what the studio offers?

I wanted visitors to understand the four services, compare sample packages, and find a clear way to ask for a quote. Keeping everything on one page made the demo straightforward to explore, with navigation to the main sections.

## Finding the right look

I liked the combination of dark automotive imagery, warm gold accents, and lighter sections that give the information room to breathe. The large headings pair straightforward type with a softer italic style. I wanted the result to feel calm and polished on both a laptop and a small screen.

My first reviewer suggested adding more images. Four service visuals and matching icons gave each category something recognisable: wheel cleaning, cabin care, paint polishing, and protective water beading. We kept the existing typography and layout so the addition felt like part of the same design.

![Four service cards on desktop, each with a labelled generated demo image](screenshots/desktop-services.jpg)

## The phone test that mattered

The before/after slider looked fine on a laptop, but on my phone it caught vertical swipes and made the page awkward to scroll. Allowing vertical panning solved that problem, then exposed another: horizontal finger dragging stopped working.

The final solution allows the browser to handle vertical scrolling and adds a small touch gesture handler for horizontal movement. The native range input still supports mouse dragging, keyboard arrows, and a visible focus ring.

I tested the published version on my Xiaomi 12T Pro and confirmed that both gestures worked smoothly. That was a useful reminder that a good desktop preview cannot tell the whole story.

<p>
  <img src="screenshots/mobile-home.jpg" alt="APEX homepage at a phone viewport, with stacked quote and package buttons" width="280" />
  <img src="screenshots/mobile-comparison.jpg" alt="APEX comparison section at a phone viewport, showing the divider and generated-image disclosure" width="280" />
</p>

The images above are browser screenshots at a phone viewport. I checked the gestures separately on my physical phone.

## Working with AI

I brought APEX from an idea to a working demo with help from Codex. I guided the direction, gathered feedback, reviewed the design, and tested the experience. Codex handled the implementation and assisted with design, imagery, and technical checks. My contribution was in shaping the project, checking the result, and deciding when it felt ready to share.

## Where it landed

I published APEX on Netlify, connected to its GitHub repository. Before release, Codex checked the types, production build, responsive overflow, navigation, FAQs, quote links, mouse and keyboard controls, and visible focus. I reviewed the site on my laptop and phone, then tested the gestures again on the published version.

I am sharing APEX as a fictional portfolio demo. I have kept the prices, contact details, reviews, and generated visuals labelled as samples, with `noindex, nofollow` still in place. I am not presenting it as real customer work or claiming booking results or business performance.
