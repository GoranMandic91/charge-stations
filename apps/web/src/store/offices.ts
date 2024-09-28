import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { postLogin, postRegister } from "../api/auth";
import { getOffices, postOffice } from "../api/offices";

interface OfficesState {
  list: any[];
  isLoading: boolean;
  isCreateDialogOpen: boolean;
}
const initialState: OfficesState = {
  list: [],
  isLoading: false,
  isCreateDialogOpen: false,
};

export const getAllOffices = createAsyncThunk<any, void, { state: RootState }>(
  "offices/getAll",
  async (_, thunkAPI) => {
    return await getOffices(thunkAPI.getState().auth.user.token);
  }
);

export const createNewOffice = createAsyncThunk<any, any, { state: RootState }>(
  "offices/postOffice",
  async (data, thunkAPI) => {
    await postOffice(data, thunkAPI.getState().auth.user.token);
    thunkAPI.dispatch(getAllOffices());
  }
);

const officesSlice = createSlice({
  name: "offices",
  initialState,
  reducers: {
    setIsCreateDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isCreateDialogOpen = action.payload;
    },
  },
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
    builder.addCase(createNewOffice.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createNewOffice.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createNewOffice.fulfilled, (state, action) => {
      state.isLoading = false;
    });
  },
});

const { reducer, actions } = officesSlice;

export const { setIsCreateDialogOpen } = actions;
export default reducer;
