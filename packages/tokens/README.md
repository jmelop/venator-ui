# @venator-ui/tokens

Design tokens and Tailwind preset used internally by Venator UI.

Provides the foundation for colors, spacing, typography and layout across Venator components.

## Installation

```bash
npm install @venator-ui/tokens
```

## Usage

### Tailwind preset

```js
// tailwind.config.js
const { venatorPreset } = require('@venator-ui/tokens');

module.exports = {
  darkMode: 'class',
  presets: [venatorPreset],
  content: ['./src/**/*.{ts,tsx}'],
};
```

### Raw tokens

Use tokens directly if you want to extend or customize your design system.

```ts
import { colors, typography, borderRadius, shadows, breakpoints } from '@venator-ui/tokens';
```

## Tokens

- `colors` — primary, neutral (with 950), success, warning, error
- `typography` — fontFamily, fontSize, fontWeight
- `borderRadius` — sm, md, lg, full
- `shadows` — sm, md, lg
- `breakpoints` — sm, md, lg, xl, 2xl
