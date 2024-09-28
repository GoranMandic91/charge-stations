import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { postLogin } from "../api/auth";

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
  },
});

const { reducer, actions } = authSlice;

export const { setUser } = actions;
export default reducer;
