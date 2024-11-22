import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchFlight: builder.query({
      query: (searchParams) => {
        console.log(searchParams);

        return {
          url: `/flights/search?searchTerm=${searchParams.searchTerm}`,
          method: "GET"
        };
      },
      providesTags: ["flights", "bookings"]
    }),
    flightDetails: builder.query({
      query: (id) => ({
        url: `/flights/${id}`,
        method: "GET"
      }),
      providesTags: ["flights", "bookings"]
    }),
    getAllFlights: builder.query({
      query: () => ({
        url: "/flights",
        method: "GET"
      }),
      providesTags: ["flights", "bookings"]
    }),
    deleteFlight: builder.mutation({
      query: (id) => ({
        url: `/flights/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["flights", "bookings"]
    }),
    createFlight: builder.mutation({
      query: (data) => ({
        url: "/flights",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["flights", "bookings"]
    })
  })
});

export const {
  useSearchFlightQuery,
  useFlightDetailsQuery,
  useGetAllFlightsQuery,
  useDeleteFlightMutation,
  useCreateFlightMutation
} = authApi;
