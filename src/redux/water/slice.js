import { createSlice } from "@reduxjs/toolkit";
import {
  addWaterItem,
  deleteWaterItem,
  editWaterData,
  fetchWaterData,
  fetchWaterItems,
  getWaterPerDay,
  postWaterData,
} from "./operations";

const today = new Date().toLocaleDateString("en-CA");

const INITIAL_STATE = {
  items: [],
  daysDrinking: null,
  dayDetails: [],
  chosenDate: today.slice(0, 10),
  chosenMonth: today.slice(0, 7),
  loading: false,
  statistics: false,
  error: null,
  itemsPerDay: [],
  waterAmountPerDay: null,
};

const waterSlice = createSlice({
  name: "water",
  initialState: INITIAL_STATE,
  reducers: {
    setChosenMonth(state, action) {
      state.chosenMonth = action.payload;
    },
    setChosenDate(state, action) {
      state.chosenDate = action.payload;
    },
    setStatistics(state, action) {
      state.statistics = action.payload;
    },
    setWaterAmountPerDay(state, action) {
      state.waterAmountPerDay = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWaterData.fulfilled, (state, action) => {
        if (action.meta.arg.type === "month") {
          state.daysDrinking = action.payload;
        } else if (action.meta.arg.type === "day") {
          state.dayDetails = action.payload;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchWaterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchWaterItems.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchWaterItems.fulfilled, (state, action) => {
        (state.loading = false), (state.itemsPerDay = action.payload);
      })
      .addCase(fetchWaterItems.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(addWaterItem.pending, () => {})
      .addCase(addWaterItem.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addWaterItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteWaterItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWaterItem.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.dayDetails = state.dayDetails.filter(
          (item) => item._id !== action.payload
        );
        // також daysDrinking треба змінити
        state.daysDrinking = state.daysDrinking.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteWaterItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editWaterData.pending, (state) => {
        state.loading = true;
      })
      .addCase(editWaterData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.dayDetails.findIndex(
          (item) => item._id === action.payload.data._id
        );
        if (index !== -1) {
          state.dayDetails[index] = action.payload.data;

          // також і daysDrinking
          const dayIndex = state.daysDrinking.findIndex(
            (day) => day._id === action.payload.data._id
          );
          if (dayIndex !== -1) {
            state.daysDrinking[dayIndex] = action.payload.data;
          }
        }
      })
      .addCase(editWaterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getWaterPerDay.pending, (state) => {
        state.error = null;
      })
      .addCase(getWaterPerDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getWaterPerDay.fulfilled, (state, action) => {
        state.dayDetails = action.payload;
        state.waterAmountPerDay = action.payload;
      })
      .addCase(postWaterData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postWaterData.fulfilled, (state, action) => {
        state.loading = false;
        state.dayDetails.push(action.payload.data);
        state.daysDrinking.push(action.payload.data);
      })
      .addCase(postWaterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setChosenMonth,
  setChosenDate,
  setStatistics,
  setWaterAmountPerDay,
} = waterSlice.actions;
export const waterReducer = waterSlice.reducer;
