# PowerCast Mobile

React Native frontend built with Expo, NativeWind, and a shadcn/ui-inspired component layer.

PowerCast is an energy intelligence experience for deep learning-based forecasting of electricity generation structure and natural gas dependency risks. The initial authentication experience is available in `src/presentation/screens/AuthScreen.tsx`.

## Getting started

```bash
npm install
npm start
```

Use the Expo CLI prompts to open the app on Android, iOS, or web.

## Architecture

- `src/app` - application composition and providers
- `src/domain` - framework-independent types and business concepts
- `src/data` - API clients, persistence, and repository implementations
- `src/presentation/components/ui` - reusable, accessible UI primitives
- `src/presentation/hooks` - stateful presentation logic
- `src/presentation/screens` - screen-level composition
- `src/lib` - small shared utilities
- `docs/PROJECT.md` - product purpose and product principles
- `docs/DESIGN_SYSTEM.md` - visual theme, tokens, typography, and component rules
- `docs/AUTH_DEVELOPMENT.md` - production standards for Login and Register integration

NativeWind provides Tailwind utility classes for React Native. The UI primitives intentionally follow shadcn/ui conventions: small composable components, explicit variants, and className overrides.

## Available scripts

- `npm run start` - start the Expo development server
- `npm run android` - build and launch the Android app
- `npm run ios` - build and launch the iOS app
- `npm run web` - launch the web target
- `npm run typecheck` - run TypeScript checks
- `npm run lint` - run Expo ESLint checks
