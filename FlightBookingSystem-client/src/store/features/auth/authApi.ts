import { TUserSignUp } from "../../../types/types.auth";
import { baseApi } from "../../api/baseApi";

type TUserLogin = {
  email: string;
  password: string;
};

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo: TUserLogin) => ({
        url: "/login",
        method: "POST",
        body: userInfo
      })
    }),
    signUp: builder.mutation({
      query: (userInfo: TUserSignUp) => ({
        url: "/register",
        method: "POST",
        body: userInfo
      })
    }),
    updateProfile: builder.mutation({
      query: (userInfo: TUserSignUp) => ({
        url: "/user/updateProfile",
        method: "PATCH",
        body: userInfo
      })
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET"
      }),
      providesTags: ["users"]
    })
  })
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useUpdateProfileMutation,
  useGetAllUsersQuery
} = authApi;
