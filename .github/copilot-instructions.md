# GitHub Copilot / AI Agent Instructions for SafePickup

Purpose: give AI assistant concise, actionable facts to be productive in this Expo + TypeScript app.

Quick start
- Project type: Expo-managed React Native app (see `app.json` and `package.json`).
- Key scripts (from `package.json`):
  - `npm run start` — starts Expo dev server
  - `npm run android` / `npm run ios` / `npm run web` — platform targets
  - `npm run lint` — runs ESLint
  - `npm run reset-project` — project reset helper (referenced in `package.json`)

Architecture overview
- File-based routing using Expo Router. Entry is `expo-router/entry` (see `package.json` "main").
- App screens live under `app/` (examples: `app/_layout.tsx`, `app/index.tsx`, `app/register.tsx`, `app/dashboard.tsx`).
  - Pattern: add a new screen by creating `app/YourScreen.tsx` exporting a default React component.
  - `_layout.tsx` defines shared layout/navigation for nested routes.
- `components/` contains reusable UI primitives and shared presentational components.
- `hooks/` contains custom React hooks used across screens.
- `services/` contains API clients or integrations (currently a README placeholder — check before adding new services).
- `assets/images/` stores icons and splash assets.

Important libraries & integration points
- Expo Router (`expo-router`) for routing and navigation. Do not change the `main` entry without verifying router expectations.
- React Navigation packages are present for tab/stack patterns (`@react-navigation/*`).
- Reanimated (`react-native-reanimated`) and `react-native-gesture-handler` are installed — follow their setup docs if editing animations.
- TypeScript is configured (`tsconfig.json`) — prefer typed components and exported props.

Code patterns & conventions
- Screens: default export of a React component (function components with hooks). Look at `app/index.tsx` for the canonical pattern.
- Layout: shared layout and navigation live in `app/_layout.tsx` — reuse it for new nested routes.
- Use `components/` for UI reuse; avoid copying UI code between screens.
- `services/` should encapsulate side effects and network calls. If adding a service, add a README entry.
- Keep UI logic in screens/components and side-effecting logic in `hooks/` or `services/`.

Build, run, debug notes (project-specific)
- Start development: `npm run start` then open emulator or device via Expo DevTools.
- Run on Android: `npm run android` (opens Metro + deploys to connected emulator/device).
- Linting: `npm run lint` (uses `expo lint` and `eslint.config.js`).
- If you encounter caching or environment issues, `npm run reset-project` is a repository script referenced in `package.json` — inspect `scripts/` if present before using.

What to watch for when editing
- Changing routing or `app/_layout.tsx` affects all nested routes — test navigation flows after edits.
- Native libraries (Reanimated, gesture handler) may require Metro or native rebuilds; prefer running on device/emulator when changing native-linked code.
- Keep TypeScript types updated in `tsconfig.json` and `@types/*` devDeps when adding new libraries.

Where to look for examples
- Routing/layout example: [app/_layout.tsx](app/_layout.tsx)
- Root screen example: [app/index.tsx](app/index.tsx)
- Screens: [app/register.tsx](app/register.tsx), [app/dashboard.tsx](app/dashboard.tsx)
- Project metadata and scripts: [package.json](package.json)
- ESLint config: [eslint.config.js](eslint.config.js)

If unsure, ask the developer these quick questions
- Should this change be prototyped on web or device first?
- Are there expected API endpoints or a mock server for `services/` work?
- Is adding native code acceptable, or should work stay JS-only?

End: after applying changes, run `npm run lint` then `npm run start` to verify no type/lint errors and that the app starts.
