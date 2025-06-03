import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AuthService, { IUser } from "../../auth/AuthService";
import axios from "axios";
import { API_URL } from "../../http";

interface AuthState {
  user: IUser | null;
  isAuth: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
  isAdmin: false,
  loading: false,
  error: null,
};

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const registration = createAsyncThunk(
  "auth/registration",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await AuthService.registration(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await AuthService.logout();
    localStorage.removeItem("token");
    return true;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Logout failed"
    );
  }
});

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      return response.data; // Возвращаем все данные, включая информацию о пользователе и его роли
    } catch (error: any) {
      localStorage.removeItem("token");
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Authentication failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        state.isAdmin = action.payload.user?.role === "admin"; // Устанавливаем флаг для админа на основе ответа от сервера
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(registration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        state.isAdmin = action.payload.user?.role === "admin";
      })
      .addCase(registration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
        state.user = null;
        state.isAdmin = false; // Сброс флага администратора при выходе
      });
  },
});

export const { setAuth, setUser } = authSlice.actions;
export default authSlice.reducer;
