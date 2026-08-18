# Kaleris Landing

Vite + React + TypeScript landing page for the Kaleris project.

## Develop
```bash
npm install
npm run dev
```

## Build
```bash
npm run build   # outputs to dist/
```

## Deploy to AWS Amplify
1. Push this repo to GitHub/GitLab/Bitbucket.
2. In the Amplify console: **New app → Host web app → connect the repo**.
3. Amplify auto-detects Vite. The included `amplify.yml` builds `dist/`.
4. Deploy.

## Assets
- `public/hero.mp4` — hero background video
- `public/images/*.jpg` — solution / section imagery
Replace these with production assets (or wire to WordPress/CMS) as needed.

## Next steps (headless + Salesforce)
The demo form + QR in the "See it live" section are the hand-off to the
Salesforce lead pipeline (AWS API Gateway → Lambda → Salesforce REST).
Wire those endpoints, then migrate to Next.js/headless WordPress when ready.
