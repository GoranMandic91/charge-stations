import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { postLogin, postRegister } from "../api/auth";
import { getOffices } from "../api/offices";

interface OfficesState {
  list: any[];
  isLoading: boolean;
}
const initialState: OfficesState = {
  list: [],
  isLoading: false,
};

export const getAllOffices = createAsyncThunk<any, void, { state: RootState }>(
  "offices/getAll",
  async (_, thunkAPI) => {
    return await getOffices(thunkAPI.getState().auth.user.token);
  }
);

const officesSlice = createSlice({
  name: "offices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOffices.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllOffices.rejected, (state) => {
      state.isLoading = false;
      state.list = [];
    });
    builder.addCase(getAllOffices.fulfilled, (state, action) => {
      state.isLoading = false;
      state.list = action.payload.offices;
    });
  },
});

const { reducer, actions } = officesSlice;

export const {} = actions;
export default reducer;
