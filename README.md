# Ethan Moon’s stadium portfolio

[Live portfolio](https://emoon0108.github.io/) — a playable soccer field inside an original Big House-inspired stadium. Nine project exhibits surround the pitch; stop 10 is About Me.

## Explore

- WASD or arrow keys move the ball relative to the camera. Space kicks; R resets.
- Click the grass to move, drag to orbit, and scroll to zoom.
- Select a numbered exhibit or use the Projects index. Each project has its own modeled object and an animation control.
- Follow ball switches to a closer camera. Touch direction buttons and Kick support phones.
- Less motion freezes the crowd, flags, and exhibit animations. The system reduced-motion preference is respected automatically.
- List view exposes the same project descriptions, links, résumé, and experience without WebGL. It is also the no-JavaScript and print fallback.

## Development

Next.js 16, React 19, TypeScript, Three.js, and original CSS. All scenery and project objects are modeled procedurally in this repository; there are no downloaded stadium models.

```sh
npm ci
npm run dev
npm run check
```

`check` runs ESLint, content and ball-physics tests, and the static production build. GitHub Actions deploys `out/` to GitHub Pages on pushes to `main`.

The scene batches supporters into instanced meshes, caps rendering near 30 fps and pixel ratio at 1.5, reuses static shadows, and stops rendering while hidden. No audio plays automatically.

## Content and references

Project descriptions were checked against the supplied résumé, GitHub repositories, and LinkedIn. Sources and visual references are recorded in [docs/design-notes.md](docs/design-notes.md).

`public/Ethan_Moon_Resume.pdf` is the exact supplied September 2026 résumé. The legacy career-document generator writes drafts only to ignored `tmp/legacy-career-documents/`; it cannot overwrite the current résumé.

Original code is available under [MIT](LICENSE). Personal documents and photography are covered separately by [ASSET-LICENSE.md](ASSET-LICENSE.md).
