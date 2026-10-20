import { useCallback, useReducer } from 'react';

// Wraps useReducer so that every state change is also persisted to localStorage.
// Usage: useLocalStorage(key, reducer, initialState)
export function useLocalStorageReducer(key, reducer, initialState) {
  const init = () => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialState;
    } catch {
      return initialState;
    }
  };

  const [state, baseDispatch] = useReducer(reducer, undefined, init);

  const dispatch = useCallback(
    (action) => {
      baseDispatch(action);
      // We can't read the next state here synchronously, so we use a lazy
      // approach: run the reducer ourselves to get the new value, then save it.
      // This keeps the hook self-contained with no extra useEffect needed.
    },
    [baseDispatch]
  );

  // We need the next state to persist it — use a middleware-style wrapper.
  const persistingDispatch = useCallback(
    (action) => {
      // Derive next state using the reducer directly so we can save it.
      const nextState = reducer(state, action);
      try {
        localStorage.setItem(key, JSON.stringify(nextState));
      } catch {
        // Ignore storage errors (private browsing quota, etc.)
      }
      baseDispatch(action);
    },
    [key, reducer, state, baseDispatch]
  );

  return [state, persistingDispatch];
}
