import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
};

export const SESSION_STORAGE_KEY = 'auth/session';

export const restoreSessionAsync = createAsyncThunk('auth/restoreSession', async () => {
  const json = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
  if (json) {
    try {
      const data = JSON.parse(json);
      if (data && typeof data.token === 'string') {
        return { token: data.token };
      }
    } catch (e) {
      return { token: null };
    }
  }
  return { token: null };
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      AsyncStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify({ token: action.payload.token })
      );
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      AsyncStorage.removeItem(SESSION_STORAGE_KEY);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(restoreSessionAsync.fulfilled, (state, action) => {
      if (action.payload.token) {
        state.isAuthenticated = true;
        state.token = action.payload.token;
      } else {
        state.isAuthenticated = false;
        state.token = null;
      }
    });
  }
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;
export const selectToken = (state: any) => state.auth.token;
