# TypeScript Deployment Fix Plan

## Overview
Fix TypeScript compilation errors blocking Vercel deployment and establish patterns to prevent future issues.

## Critical Error (BLOCKING DEPLOYMENT)

### Issue: Framer Motion Easing Array Type Mismatch
**File:** `src/app/demos/page-load/page.tsx` (Line 73)

**Problem:** TypeScript cannot infer that the ease array `[0.43, 0.13, 0.23, 0.96]` is a valid cubic bezier tuple.

**Solution:** Cast the array as a const tuple or use type assertion.

**Fix:**
```typescript
// Current (FAILS):
ease: [0.43, 0.13, 0.23, 0.96]

// Fixed Option 1 (PREFERRED):
ease: [0.43, 0.13, 0.23, 0.96] as const

// Fixed Option 2:
ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number]
```

## Secondary Issues (NOT blocking but should fix)

### 1. Duplicate `style` Props
**Files affected:**
- `src/app/demos/page-load/page.tsx` (lines 239, 246, 253)
- Multiple animated components

**Problem:** Multiple `style` attributes on same element
```tsx
<animated.div 
  style={spring1}
  className="font-pci-sans-bold"
  style={{...spring1, fontSize: 'var(--text-header)' }}  // DUPLICATE
>
```

**Fix:** Merge into single style prop
```tsx
<animated.div 
  className="font-pci-sans-bold"
  style={{...spring1, fontSize: 'var(--text-header)' }}
>
```

### 2. React Hooks Rules Violations
**Files affected:**
- `src/app/demos/enhancements/page.tsx` (line 110)
- `src/app/demos/scroll/page.tsx` (lines 89-90)

**Problem:** Hooks called inside callbacks or non-component functions

**Fix:** Move hooks to component body or create proper custom hooks

### 3. Unused Variables/Imports
**Pattern:** Remove or use unused variables to keep code clean

**Examples:**
- `src/app/demos/page-load/page.tsx`: Remove unused `ComparisonView` import
- `src/app/demos/micro/page.tsx`: Remove unused `config`, `isHovered`
- `src/app/demos/scroll/page.tsx`: Remove unused `useState`, `useSpring`, `animated`, `DemoControls`

## Recommended Patterns for Future

### 1. Framer Motion Easing
Always use `as const` for cubic bezier arrays:
```typescript
const variants = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96] as const  // ✅ Type-safe
    }
  }
};
```

### 2. Style Props with Animated Components
Merge all styles into single prop:
```tsx
// ❌ BAD
<animated.div style={spring} style={{fontSize: '24px'}}>

// ✅ GOOD  
<animated.div style={{...spring, fontSize: '24px'}}>
```

### 3. TypeScript Strict Mode Compliance
- Avoid `any` types where possible
- Use proper typing for event handlers
- Type component props explicitly

### 4. ESLint Configuration
Consider updating `eslint.config.mjs` to:
- Turn some warnings into errors for critical issues
- Disable non-critical rules that don't affect functionality
- Add exceptions for demo/test files

## Implementation Priority

### Phase 1: CRITICAL (Deploy Blocker)
1. ✅ Fix easing array type in `page-load/page.tsx` line 73
2. ✅ Fix duplicate style props in `page-load/page.tsx` lines 239, 246, 253

### Phase 2: HIGH PRIORITY (React Errors)
3. Fix React Hooks violations in demos
4. Remove unused imports causing warnings

### Phase 3: CLEANUP (Code Quality)
5. Remove unused variables across demo files
6. Fix console.log statements (or disable rule for dev files)
7. Consider Image component migration (performance, not blocking)

## Testing Strategy
1. Run `npm run build` locally before pushing
2. Check TypeScript compilation: `npx tsc --noEmit`
3. Run linter: `npm run lint`
4. Test in Vercel preview deployments first

## Prevention Measures
1. Add pre-commit hook to run TypeScript check
2. Update CI/CD to fail on TypeScript errors early
3. Document common type patterns in project README
4. Use stricter TypeScript config for non-demo files

## Notes
- All ESLint warnings are non-blocking (compilation succeeded before type check)
- Main deployment blocker is the TypeScript type error
- Demo files have more lenient standards than production code
- Consider separate ESLint config for `/demos` directory

