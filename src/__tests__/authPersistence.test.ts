import { configureStore } from '@reduxjs/toolkit';
import authReducer, { restoreSessionAsync, SESSION_STORAGE_KEY } from '../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('Auth session persistence', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('restores session if valid token is stored', async () => {
    await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({token: 'persisted_token'}));
    const store = configureStore({reducer: {auth: authReducer}});
    await store.dispatch(restoreSessionAsync());
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(true);
    expect(state.token).toBe('persisted_token');
  });

  it('does not restore session if no token', async () => {
    await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({token: null}));
    const store = configureStore({reducer: {auth: authReducer}});
    await store.dispatch(restoreSessionAsync());
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
    expect(state.token).toBeNull();
  });

  it('does not restore if storage empty', async () => {
    const store = configureStore({reducer: {auth: authReducer}});
    await store.dispatch(restoreSessionAsync());
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
    expect(state.token).toBeNull();
  });
});
