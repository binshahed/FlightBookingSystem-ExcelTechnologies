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
    })
  })
});

export const { useLoginMutation, useSignUpMutation } = authApi;
