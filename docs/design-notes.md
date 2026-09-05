# Design and content notes

Reviewed September 5, 2026.

## Direction

The user requested an immersive portfolio inspired by [Bruno Simon](https://bruno-simon.com/), with a playable soccer field, a massive packed stadium, jumbotrons, and a tenth About Me exhibit. Bruno’s useful reference is spatial navigation and discoverable physical objects. No code, models, textures, layout, or vehicle mechanics were copied.

The stadium is an original low-poly interpretation of Michigan Stadium. It uses the continuous broad bowl, opposing brick/glass sideline buildings, and end-zone video boards seen in University of Michigan Athletics references:

- [Michigan Stadium facilities](https://mgoblue.com/sports/2017/6/16/facilities-michigan-stadium-html)
- [Official scoreboard renderings](https://mgoblue.com/news/2022/10/18/football-athletics-unveils-renderings-of-new-michigan-stadium-scoreboards)
- [Official aerial reference photograph](https://images.sidearmdev.com/resize?url=https%3A%2F%2Fmgoblue.com%2Fimages%2F2022%2F12%2F23%2F20221223-generic-GolfCourse-Stadium_FBL22-AthleticCampusAerials22_015.jpg&width=1600)

The playing surface and surrounding concourse are enlarged relative to the architecture to fit the interactive exhibits. It is not a surveyed scale replica and does not claim the real stadium’s seating capacity. Source photographs are references only and are not shipped.

The visual direction avoids repetitive feature cards, stock gradient backgrounds, and abstract spinning objects. [Anthropic’s discussion of generic frontend output](https://claude.com/blog/improving-frontend-design-through-skills) informed this review; appearance alone does not identify how a site was made. Copy describes concrete work, collaborators, and prototype limitations without promotional slogans.

## Content sources

- User-supplied `Ethan_Moon_Resume (4).pdf`, copied without alteration to the public résumé.
- [LinkedIn](https://www.linkedin.com/in/ethan-moon0108/), including Ody, Michigan iRaL, GVSU bioprinting, and summer 2025 aerospace research.
- [NoSpoilers](https://github.com/BoatingToast/nospoilers), a collaborative project; [live product](https://nospoilers.xyz).
- [ViolinTwin](https://github.com/emoon0108/ViolinTwin), including its custom native development-build requirement.
- [AcademiQ](https://github.com/emoon0108/academic-planner), including prerequisite constraints and its local demo.
- [Healthy Eaters](https://github.com/emoon0108/HealthyEaters), explicitly identifying the simulated plate connection.
- [Referral Intelligence](https://github.com/emoon0108/sportlingo-referral-dashboard), with synthetic demo data and browser-local CSV handling.

The ten physical objects are a projector, bioprinter, violin, semester planner, restaurant, drone, smart plate, referral funnel, satellite/airfoil, and number-ten jersey locker. The portrait is an optimized derivative of the existing owner-supplied image. Browser 3D is supported; this release does not implement a WebXR headset mode.

## Verification

`npm run check` passes ESLint, nine content/physics checks, TypeScript, and the static export build. The résumé test uses the SHA-256 of the supplied PDF. Physics checks cover both goals, the scoring cooldown/reset, misses, acceleration/drag, frame-rate consistency, collision handling, and all ten station locations.

The production export was reviewed in Chrome at desktop size and 390 × 844. Each of the nine project objects was visually inspected and its animation control activated. Stop 10 was opened by tapping its field marker; About Me includes the portrait and number-ten jersey. The revised close-up camera stays inside the bowl. Mobile panels fit without horizontal overflow and reset their scroll position on project navigation. A live gameplay sequence scored a goal, updated the visible counter, and returned the ball to the center circle. The follow-ball view and the static List view were exercised. No browser console errors were reported during these checks.
