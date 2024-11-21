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
    }),
    getAllBooking: builder.query({
      query: () => ({
        url: `/bookings`,
        method: "GET"
      }),
      providesTags: ["flights", "bookings"]
    }),
    updateBooking: builder.mutation({
      query: ({ id, data }) => {
        console.log(data);
        return {
          url: `/bookings/${id}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ["flights", "bookings"]
    })
  })
});

export const {
  useCreateBookingMutation,
  useGetMyBookingsQuery,
  useGetAllBookingQuery,
  useUpdateBookingMutation
} = authApi;
