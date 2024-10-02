import { RootState } from ".";
import { ChargerParams, patchCharger, postCharger } from "../api/chargers";
import {
  getOfficeByID,
  getOffices,
  getOfficeStatisticsByID,
  OfficeParams,
  postOffice,
} from "../api/offices";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ChargingUser {
  id: string;
  name: string;
}

export interface Charger {
  id: number;
  available: boolean;
  sessionStart: Date | null;
  sessionEnd: Date | null;
  reservedBy: ChargingUser | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Office {
  _id: string;
  name: string;
  queue: any[];
  location: string;
  chargers: Charger[];
  highDemandDuration: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionStats {
  name: string;
  userId: string;
  totalSessions: number;
}

export interface DurationStats {
  name: string;
  userId: string;
  totalChargingTime: number;
}

export interface ChargingStatistics {
  sessions: SessionStats[];
  duration: DurationStats[];
}

export interface OfficesState {
  list: Office[];
  office?: Office;
  statistics?: ChargingStatistics;
  isLoading: boolean;
  isCreateDialogOpen: boolean;
}

const initialState: OfficesState = {
  list: [],
  office: undefined,
  statistics: undefined,
  isLoading: false,
  isCreateDialogOpen: false,
};

export const getAllOffices = createAsyncThunk<
  { offices: Office[] },
  void,
  { state: RootState }
>("offices/getAll", async (_, thunkAPI) => {
  return await getOffices(thunkAPI.getState().auth.user?.token!);
});

export const getOfficeStatistics = createAsyncThunk<
  ChargingStatistics,
  { id: string },
  { state: RootState }
>("offices/getOfficeStatistics", async ({ id }, thunkAPI) => {
  return await getOfficeStatisticsByID(
    thunkAPI.getState().auth.user?.token!,
    id
  );
});

export const getSingleOffice = createAsyncThunk<
  { office: Office[] },
  { id: string },
  { state: RootState }
>("offices/getSingleOffice", async ({ id }, thunkAPI) => {
  return await getOfficeByID(thunkAPI.getState().auth.user?.token!, id);
});

export const createNewOffice = createAsyncThunk<
  void,
  OfficeParams,
  { state: RootState }
>("offices/postOffice", async (data, thunkAPI) => {
  await postOffice(data, thunkAPI.getState().auth.user?.token!);
  thunkAPI.dispatch(getAllOffices());
});

export const reserveChargingLot = createAsyncThunk<
  void,
  ChargerParams,
  { state: RootState }
>("offices/chargers/reserve", async (data, thunkAPI) => {
  const user = {
    id: thunkAPI.getState().auth.user?._id,
    name: thunkAPI.getState().auth.user?.fullName,
  };
  await postCharger({ ...data, user }, thunkAPI.getState().auth.user?.token!);
  thunkAPI.dispatch(getSingleOffice({ id: data.officeId }));
});

export const releaseChargingLot = createAsyncThunk<
  void,
  ChargerParams,
  { state: RootState }
>("offices/chargers/release", async (data, thunkAPI) => {
  const user = {
    id: thunkAPI.getState().auth.user?._id,
    name: thunkAPI.getState().auth.user?.fullName,
  };
  await patchCharger({ ...data, user }, thunkAPI.getState().auth.user?.token!);
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
    builder.addCase(getOfficeStatistics.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOfficeStatistics.rejected, (state) => {
      state.isLoading = false;
      state.list = [];
    });
    builder.addCase(getOfficeStatistics.fulfilled, (state, action) => {
      state.isLoading = false;
      state.statistics = action.payload;
    });
  },
});

const { reducer, actions } = officesSlice;

export const { setIsCreateDialogOpen } = actions;
export default reducer;
