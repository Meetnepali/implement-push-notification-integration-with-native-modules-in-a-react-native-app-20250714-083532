# React Native Deep Linking & Persistent Auth Assessment

## Task Overview

You are provided with a starter React Native app (with TypeScript) that uses Redux Toolkit for authentication state, React Navigation for screen management, and AsyncStorage for session persistence. The code includes placeholders for Home, Login, and ActivityDetail screens.

**Your Goals:**

1. **Implement Deep Linking:**
   - Configure deep links such that URIs like `myfitnessapp://activity/123` open the `ActivityDetail` screen for the specified activity ID.
   - Ensure deep linking works for app launches, foreground, and background events.
2. **Persistent Authentication:**
   - Make sure authentication state (token) persists between app launches using AsyncStorage.
   - On startup, the app should restore the user session if a valid token is found.
3. **Route Protection:**
   - If a user opens the app (including via deep link) and is not authenticated, they must be redirected to `Login` before accessing protected screens (`ActivityDetail`).
   - After authenticating, users should be allowed to access protected screens without additional prompts.
4. **Unit Test:**
   - Provide a Jest unit test that verifies session restoration logic: the test should confirm that an authentication token stored in AsyncStorage is properly restored to Redux state during app launch.

## What You Need to Do

- Complete any missing logic for deep linking, session persistence, and route protection.
- Ensure that the authentication token is saved and restored using AsyncStorage.
- Implement or refine the linking configuration if needed.
- Ensure the test in `src/__tests__/authPersistence.test.ts` passes (and is correct).

## Getting Started

1. **Install dependencies:**
    - Run `npm install`

2. **Start the app:**
    - Run `npm start` (or use your preferred React Native workflow)

3. **Run unit tests:**
    - Run `npm test`

## Verification

- **Deep linking:** Launch the app with a deep link (e.g., `myfitnessapp://activity/321`).
  - If the user is authenticated, they should see the ActivityDetail screen for that ID.
  - If not authenticated, the user should be redirected to Login (even if the deep link was used).
- **Session persistence:**
  - Log in, kill and relaunch the app. The session should be retained.
  - Tests in `src/__tests__/authPersistence.test.ts` should all pass.

## Notes

- You may use all provided files; feel free to create or modify code as needed to fulfill the above requirements.
- The UI for Login, Home, and ActivityDetail screens is placeholder only; focus on authentication, deep linking, and session logic.
- No backend is provided/required; use mock token values as needed.