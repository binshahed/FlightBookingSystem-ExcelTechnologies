import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => ({
        url: `/bookings`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["flights", "bookings"]
    }),
    getMyBookings: builder.query({
      query: () => ({
        url: `/bookings/user`,
        method: "GET"
      }),
      providesTags: ["flights", "bookings"]
    })
  })
});

export const { useCreateBookingMutation, useGetMyBookingsQuery } = authApi;
