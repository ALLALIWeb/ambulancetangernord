# ambulancetangernord

Production-ready bilingual landing page for **ambulancetangernord.com**, focused on fast mobile conversion for ambulance transport requests in Tanger and Northern Morocco.

## Project files

```text
ambulancetangernord/
├── index.html
├── styles.css
├── script.js
├── .gitignore
└── README.md
```

## Features

- French-first SEO landing page with full Arabic RTL support
- Persistent language switcher (`Français | العربية`) using `localStorage`
- Repeated click-to-call CTA for `06 66 66 91 47`
- WhatsApp CTA for `https://wa.me/212666669147`
- Responsive sections for hero, services, ambulance details, gallery, service areas, FAQ, and contact
- GA4-ready event hooks for `phone_click`, `whatsapp_click`, `language_switch`, `scroll_50`, and `scroll_90`
- LocalBusiness + MedicalBusiness schema markup

## Image naming guide

Add the real optimized images inside `/images/` using these exact filenames:

```text
images/
├── ambulance-tanger-01.webp
├── ambulance-tanger-02.webp
├── ambulance-tanger-03.webp
├── ambulance-tanger-04.webp
├── ambulance-tanger-05.webp
├── ambulance-tanger-06.webp
├── ambulance-tanger-07.webp
├── ambulance-tanger-08.webp
├── ambulance-tanger-09.webp
└── ambulance-tanger-10.webp
```

Recommended usage in the page:

- `ambulance-tanger-01.webp`: hero image
- `ambulance-tanger-02.webp` to `ambulance-tanger-07.webp`: service cards
- `ambulance-tanger-08.webp` to `ambulance-tanger-10.webp`: ambulance details and gallery

## Local preview

Because this is a static site, you can preview it with any basic web server.

### Python

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Deployment checklist

Before deploying `ambulancetangernord.com`:

1. Add the 10 real ambulance images in `/images/` and compress them to WebP or AVIF.
2. Replace or enrich business location details if a more specific real address should be published.
3. Add the production Google Analytics 4 snippet and measurement ID.
4. Test the phone and WhatsApp links on a real mobile device.
5. Verify French and Arabic layouts on 320px, 375px, 414px, tablet, and desktop widths.
6. Connect the production domain and submit the sitemap to Google Search Console.
