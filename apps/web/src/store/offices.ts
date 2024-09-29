import { RootState } from ".";
import { postCharger } from "../api/chargers";
import { getOfficeByID, getOffices, postOffice } from "../api/offices";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Charger {
  id: number;
  available: boolean;
  sessionStart: Date | null;
  sessionEnd: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Office {
  _id: string;
  name: string;
  location: string;
  chargers: Charger[];
  highDemandDuration: number;
  createdAt: Date;
  updatedAt: Date;
}

interface OfficesState {
  list: Office[];
  office?: Office;
  isLoading: boolean;
  isCreateDialogOpen: boolean;
}
const initialState: OfficesState = {
  list: [],
  office: undefined,
  isLoading: false,
  isCreateDialogOpen: false,
};

export const getAllOffices = createAsyncThunk<any, void, { state: RootState }>(
  "offices/getAll",
  async (_, thunkAPI) => {
    return await getOffices(thunkAPI.getState().auth.user.token);
  }
);

export const getSingleOffice = createAsyncThunk<
  any,
  { id: string },
  { state: RootState }
>("offices/getSingleOffice", async ({ id }, thunkAPI) => {
  return await getOfficeByID(thunkAPI.getState().auth.user.token, id);
});

export const createNewOffice = createAsyncThunk<any, any, { state: RootState }>(
  "offices/postOffice",
  async (data, thunkAPI) => {
    await postOffice(data, thunkAPI.getState().auth.user.token);
    thunkAPI.dispatch(getAllOffices());
  }
);

export const reserveChargingLot = createAsyncThunk<
  any,
  any,
  { state: RootState }
>("offices/chargers/reserve", async (data, thunkAPI) => {
  await postCharger(
    { ...data, userId: thunkAPI.getState().auth.user._id },
    thunkAPI.getState().auth.user.token
  );
  thunkAPI.dispatch(getSingleOffice({ id: data.officeId }));
});

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
    builder.addCase(getSingleOffice.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSingleOffice.rejected, (state) => {
      state.isLoading = false;
      state.list = [];
    });
    builder.addCase(getSingleOffice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.office = action.payload.office[0];
    });
  },
});

const { reducer, actions } = officesSlice;

export const { setIsCreateDialogOpen } = actions;
export default reducer;
