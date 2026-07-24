import { createContext, useContext } from 'react';

// Auth + navigation values shared across the app, so the signed-in user, the
// "go to tab / open a question by id" helpers, and the sign-in modal opener
// don't have to be prop-drilled through ProblemView and its children or the
// profile menu.
// Shape: { authUser, navigateTab, requestOpenById, openAuth }
// openAuth(tab) opens the in-app auth modal; tab is 'signin' (default) or 'signup'.
export const AppContext = createContext(null);

export function useApp() {
  return useContext(AppContext);
}
