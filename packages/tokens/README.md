# @venator-ui/tokens

Design tokens for the Venator UI library.

## Installation

```bash
npm install @venator-ui/tokens
```

## Usage

```tsx
import { colors, spacing, typography } from '@venator-ui/tokens';

const MyComponent = () => (
  <div style={{
    color: colors.primary[600],
    padding: spacing[4],
    fontFamily: typography.fontFamily.sans
  }}>
    Content
  </div>
);
```

## Available Tokens

- `colors` - Color palette with primary, neutral, success, warning, and error scales
- `spacing` - Spacing scale from 0 to 24
- `typography` - Font families, sizes, weights, and line heights
- `borderRadius` - Border radius values
- `shadows` - Box shadow presets
- `breakpoints` - Responsive breakpoints
- `zIndex` - Z-index scale for layering

## Development

```bash
# Build the package
npm run build

# Watch mode
npm run dev
```
