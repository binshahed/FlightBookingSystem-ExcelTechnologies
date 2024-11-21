import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
// import { RootState } from "../../store";

export type TSeatBooking = {
  flightId: string;
  seats: {
    economy?: string[];
    business?: string[];
    firstClass?: string[];
  };
};

const initialState: TSeatBooking = {
  flightId: "",
  seats: {
    economy: [],
    business: [],
    firstClass: []
  }
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setSeatBooking: (state, action) => {
      const { flightId, seats } = action.payload;
      state.flightId = flightId;
      state.seats = seats;
    }
  }
});

export const { setSeatBooking } = bookingSlice.actions;

export default bookingSlice.reducer;

export const useSelectedFlight = (state: RootState) => state.bookings;
