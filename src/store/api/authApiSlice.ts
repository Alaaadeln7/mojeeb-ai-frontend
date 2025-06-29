import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Credentials {
  email: string;
  password: string;
}

interface UserData {
  // Define the structure of user data
  name: string;
  email: string;
  password: string;
  // Add other user fields as needed
}

interface OtpData {
  email: string;
  otp: string;
}

interface ResetPasswordData {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  // Add other user fields as needed
}

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION
        : process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT
    }auth`,
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<{ message: string; user?: User }, Credentials>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    createUser: builder.mutation<{ message: string }, UserData>({
      query: (userData) => ({
        url: "/create-user",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    checkAuth: builder.query<{ isAuthenticated: boolean; user?: User }, void>({
      query: () => ({
        url: "/check-auth",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    verifyOtp: builder.mutation<{ message: string }, OtpData>({
      query: (data) => ({
        url: "/verify-otp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    forgetPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (credentials) => ({
        url: "/forget-password",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    verifyOtpForgetPassword: builder.mutation<{ message: string }, OtpData>({
      query: (credentials) => ({
        url: "/verify-otp-forget-password",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    resetPassword: builder.mutation<{ message: string }, ResetPasswordData>({
      query: (credentials) => ({
        url: "/reset-password",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    getAllUsers: builder.query<
      { users: User[]; total: number },
      { page: number }
    >({
      query: ({ page }) =>
        `/users/?page=${page}&limit=${process.env.NEXT_PUBLIC_PAGE_LIMIT}`,
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateUserMutation,
  useCheckAuthQuery,
  useLogoutMutation,
  useVerifyOtpMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useVerifyOtpForgetPasswordMutation,
  useGetAllUsersQuery,
} = authApiSlice;
