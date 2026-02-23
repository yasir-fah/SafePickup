# app/

This folder is managed by **Expo Router** and controls all navigation in the app.
Do **not** rename or move this folder — Expo Router requires it at the root level.

## Structure
```
app/
├── _layout.tsx       # Root layout, wraps the entire app
├── index.tsx         # Entry screen
└── (tabs)/
    ├── _layout.tsx   # Tab bar + header (defined once)
    ├── home.tsx      # Home screen
    └── profile.tsx   # Profile screen
```

## Rules
- Every file here becomes a **route/screen** automatically
- Shared layout (header, tabs) goes in `_layout.tsx`
- Do not put reusable components here — use `/components` instead