# useIsMobile Hook Documentation

## Overview

`useIsMobile` is a custom React hook that provides a responsive design solution by detecting whether the current viewport width matches mobile device dimensions.

## Installation

```typescript
import { useIsMobile } from '@/hooks/useIsMobile';
```

## Configuration

The hook uses a predefined breakpoint constant:

```typescript
const MOBILE_BREAKPOINT = 768; // pixels
```

Any viewport width less than this value is considered a mobile viewport.

## Usage

```typescript
function MyComponent() {
  const isMobile = useIsMobile();

  return (
    <div>
      {isMobile ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  );
}
```

## Return Value

```typescript
boolean;
```

- Returns `true` if the viewport width is less than 768px
- Returns `false` if the viewport width is 768px or greater

## Implementation Details

### State Management

```typescript
const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);
```

- Initially set to `undefined`
- Updates based on viewport width changes

### Event Handling

The hook utilizes the `window.matchMedia` API to listen for viewport changes:

```typescript
const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
```

### Cleanup

The hook properly cleans up event listeners when the component unmounts:

```typescript
return () => mql.removeEventListener('change', onChange);
```

## Browser Compatibility

- Requires browser support for:
  - `window.matchMedia`
  - `MediaQueryList` event listeners
- Compatible with modern browsers (Chrome, Firefox, Safari, Edge)

## Best Practices

1. **Performance**

   - Use the hook at the highest necessary level in your component tree
   - Avoid using in deeply nested components unless necessary

2. **Implementation**

   ```typescript
   // Good: Single responsibility component
   function ResponsiveLayout() {
     const isMobile = useIsMobile();
     return isMobile ? <MobileView /> : <DesktopView />;
   }

   // Bad: Multiple hooks in nested components
   function NestedComponent() {
     const isMobile = useIsMobile(); // Unnecessary duplicate hook
     // ...
   }
   ```

3. **Error Handling**
   - The hook returns a boolean, so type checking isn't necessary
   - Initial `undefined` state is coerced to `false` in the return statement

## Examples

### Basic Usage

```typescript
function App() {
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? 'mobile-container' : 'desktop-container'}>
      <Content />
    </div>
  );
}
```

### With Conditional Styling

```typescript
function ResponsiveButton() {
  const isMobile = useIsMobile();

  const buttonStyle = {
    padding: isMobile ? '8px 16px' : '12px 24px',
    fontSize: isMobile ? '14px' : '16px',
  };

  return <button style={buttonStyle}>Click Me</button>;
}
```

### With Conditional Rendering

```typescript
function Navigation() {
  const isMobile = useIsMobile();

  return (
    <nav>
      {isMobile ? (
        <HamburgerMenu />
      ) : (
        <DesktopNavLinks />
      )}
    </nav>
  );
}
```

## Common Pitfalls

1. **Server-Side Rendering**

   - Initial value is `undefined` to avoid hydration mismatches
   - Always returns `false` during SSR
   - Updates after component mount

2. **Multiple Instances**

   - Each hook instance creates its own event listener
   - Use sparingly to avoid performance impact

3. **Rapid Resizing**
   - Hook handles rapid window resizing efficiently
   - No debouncing needed for most use cases

## Related Concepts

- CSS Media Queries
- Responsive Design
- React Hooks
- Window Events
- Browser APIs

## Troubleshooting

1. **Hook returns false on mobile devices**

   - Verify viewport meta tag is properly set
   - Check actual viewport width against breakpoint

2. **Unexpected re-renders**

   - Ensure hook is used at appropriate component level
   - Verify dependencies array is empty

3. **SSR mismatches**
   - Initial `undefined` state handles hydration
   - Content should account for initial loading state
