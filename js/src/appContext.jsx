import { createContext, useContext } from 'react';

// Auth + navigation values shared across the app, so the signed-in user and the
// "go to tab / open a question by id" helpers don't have to be prop-drilled
// through ProblemView and its children or the profile menu.
// Shape: { authUser, navigateTab, requestOpenById }
export const AppContext = createContext(null);

export function useApp() {
  return useContext(AppContext);
}
