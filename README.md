# Mohammad Portfolio (Next.js + Sanity)

This project runs on **Next.js** with **Sanity** as the only content backend.

## Stack
- Next.js (pages router)
- Sanity Studio embedded at `/studio`
- Sanity-hosted content and media
- Sass styling preserved from the original site
- Stripe Checkout for store purchases

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env values:
   ```bash
   cp .env.example .env
   ```
3. Fill in:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `STRIPE_SECRET_KEY`

## Run site
```bash
npm run dev
```

## Run Sanity Studio
```bash
npm run dev
```
Then open `/studio`.

## Content model
- `siteSettings`
- `project`
- `musicVideo`
- `storeProduct`

## Notes
- The site now reads directly from Sanity only. Missing Sanity config or missing published content will error instead of falling back to local data.
- To add or edit site content, use Sanity Studio and publish updates.
