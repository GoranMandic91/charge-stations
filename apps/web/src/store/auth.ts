import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { postLogin, postRegister } from "../api/auth";

interface AuthState {
  user: any;
  isLoading: boolean;
}
const initialState: AuthState = {
  user: undefined,
  isLoading: false,
};

export const login = createAsyncThunk<
  null,
  { email: string; password: string },
  { state: RootState }
>("auth/login", async ({ email, password }, thunkAPI) => {
  return await postLogin(email, password);
});

export const register = createAsyncThunk<
  null,
  {
    email: string;
    password: string;
    fullName: string;
    role: string;
  },
  { state: RootState }
>("auth/register", async ({ email, password, fullName, role }, thunkAPI) => {
  return await postRegister(email, password, fullName, role);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.user = undefined;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
    });
  },
});

const { reducer, actions } = authSlice;

export const { setUser } = actions;
export default reducer;
