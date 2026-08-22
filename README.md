# Ethan Moon — Engineering Portfolio

The source for [emoon0108.github.io](https://emoon0108.github.io/), a static portfolio focused on applied AI, digital twins, simulation, and product engineering.

## What the site demonstrates

- Recruiter-oriented project summaries with honest public, private, and in-progress labels
- Direct links to live demos and source repositories where available
- Research and engineering timeline spanning bioprinting, aerospace, sensing, and software
- Responsive, accessible presentation built as a static export for GitHub Pages

## Stack

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- GitHub Actions and GitHub Pages

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production check

```bash
npm run check
```

The check lints the source, runs content-integrity tests, and produces a static site in `out/`. Pull requests are verified by [CI](.github/workflows/ci.yml); pushes to `main` are verified and deployed by [the Pages workflow](.github/workflows/deploy.yml).

## Career documents

The public résumé and CV are generated from [`scripts/build-career-documents.py`](scripts/build-career-documents.py), keeping the source reviewable and preventing stale or private information from slipping into an export.

```bash
python -m pip install reportlab
python scripts/build-career-documents.py
```

## Featured public work

| Project | Code | Demo |
| --- | --- | --- |
| NoSpoilers | [Repository](https://github.com/BoatingToast/nospoilers) | [Live product](https://nospoilers-blush.vercel.app/) |
| ViolinTwin | [Repository](https://github.com/emoon0108/ViolinTwin) | [Project page](https://emoon0108.github.io/ViolinTwin/) |
| Healthy Eaters | [Repository](https://github.com/emoon0108/HealthyEaters) | [Project page](https://emoon0108.github.io/HealthyEaters/) |
| Referral Intelligence | [Repository](https://github.com/emoon0108/sportlingo-referral-dashboard) | [Live dashboard](https://emoon0108.github.io/sportlingo-referral-dashboard/) |

## License

Original source code is available under the [MIT License](LICENSE). Personal documents, portrait photography, fonts, and third-party material are excluded as described in [ASSET-LICENSE.md](ASSET-LICENSE.md).
