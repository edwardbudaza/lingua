# Exit Modal Store Documentation

## Overview

The `useExitModal` is a Zustand store that manages the state of an exit confirmation modal. It provides a simple API for controlling the modal's visibility state.

## Store Architecture

### State Interface

```typescript
type ExitModalState = {
  isOpen: boolean; // Tracks modal visibility
  open: () => void; // Opens the modal
  close: () => void; // Closes the modal
};
```

### Store Implementation

```typescript
import { create } from 'zustand';

export const useExitModal = create<ExitModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
```

## Usage Examples

### Basic Usage

```typescript
function ExitModalComponent() {
  const { isOpen, close } = useExitModal();

  return (
    {isOpen && (
      <div className="modal">
        <h2>Are you sure you want to exit?</h2>
        <button onClick={close}>Cancel</button>
      </div>
    )}
  );
}
```

### Triggering the Modal

```typescript
function NavigationComponent() {
  const open = useExitModal((state) => state.open);

  return (
    <button onClick={open}>
      Exit Application
    </button>
  );
}
```

### Selective State Usage

```typescript
// Only subscribe to isOpen state
function ModalOverlay() {
  const isOpen = useExitModal((state) => state.isOpen);

  return isOpen ? <div className="overlay" /> : null;
}
```

## State Management

### Initial State

- `isOpen`: `false` (modal starts closed)

### Actions

1. `open`: Sets `isOpen` to `true`
2. `close`: Sets `isOpen` to `false`

## Best Practices

### State Selection

```typescript
// Good: Select only needed state
const isOpen = useExitModal((state) => state.isOpen);

// Avoid: Selecting entire store when unnecessary
const modal = useExitModal(); // Causes more re-renders
```

### Component Organization

```typescript
// Good: Separate concerns
function ExitButton() {
  const open = useExitModal((state) => state.open);
  return <button onClick={open}>Exit</button>;
}

function ExitModal() {
  const isOpen = useExitModal((state) => state.isOpen);
  const close = useExitModal((state) => state.close);
  // Modal implementation
}

// Avoid: Mixing concerns
function CombinedComponent() {
  const { isOpen, open, close } = useExitModal();
  // Mixed button and modal implementation
}
```

## Performance Considerations

### Render Optimization

- Use selective state subscriptions to prevent unnecessary re-renders
- Components only re-render when their selected state changes

### Memory Usage

- Single store instance shared across components
- Minimal memory footprint due to simple state structure

## Integration Examples

### With React Router

```typescript
function RouterIntegration() {
  const open = useExitModal((state) => state.open);

  return (
    <Router>
      <Prompt
        when={true}
        message={() => {
          open();
          return false;
        }}
      />
    </Router>
  );
}
```

### With Form Handling

```typescript
function FormComponent() {
  const open = useExitModal((state) => state.open);

  const handleFormClose = (e: React.FormEvent) => {
    e.preventDefault();
    if (formIsDirty) {
      open();
      return;
    }
    // Close form logic
  };
}
```

## Troubleshooting

### Common Issues

1. **Unnecessary Re-renders**

   ```typescript
   // Problem: Selecting entire store
   const store = useExitModal();

   // Solution: Select only needed state
   const isOpen = useExitModal((state) => state.isOpen);
   ```

2. **State Updates Not Reflecting**

   ```typescript
   // Problem: Async state access
   setTimeout(() => {
     const isOpen = useExitModal.getState().isOpen;
   }, 1000);

   // Solution: Use store subscription
   useExitModal.subscribe((state) => {
     console.log(state.isOpen);
   });
   ```

## Testing

### Unit Testing

```typescript
import { useExitModal } from './exitModal';

describe('ExitModal Store', () => {
  beforeEach(() => {
    useExitModal.setState({ isOpen: false });
  });

  it('should open modal', () => {
    useExitModal.getState().open();
    expect(useExitModal.getState().isOpen).toBe(true);
  });

  it('should close modal', () => {
    useExitModal.getState().close();
    expect(useExitModal.getState().isOpen).toBe(false);
  });
});
```

## Security Considerations

- No sensitive data stored in the modal state
- Safe to use with server-side rendering
- No persistence or localStorage integration by default

## Future Enhancements

Potential improvements to consider:

1. Add transition state management
2. Include custom exit messages
3. Add confirmation callback support
4. Implement state persistence if needed
