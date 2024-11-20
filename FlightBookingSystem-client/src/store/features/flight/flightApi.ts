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
    })
  })
});

export const { useSearchFlightQuery } = authApi;
