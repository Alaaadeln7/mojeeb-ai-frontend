"use client";
import {
  useCheckAuthQuery,
  useCreateUserMutation,
  useForgetPasswordMutation,
  useGetAllUsersQuery,
  useLoginMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useVerifyOtpForgetPasswordMutation,
  useVerifyOtpMutation,
} from "@/store/api/authApiSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";
import { number } from "yup";

interface UserData {
  // Define the shape of your user data here
  [key: string]: unknown;
}
interface Credentials {
  // Define the shape of your credentials here
  [key: string]: unknown;
}

interface ApiResponse {
  data?: {
    message?: string;
    users?: UserData[];
    totalPages?: number;
    // Add other response properties as needed
  };
  error?: {
    data?: {
      message?: string;
    };
  };
}

export default function useAuth() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [createUser, { isLoading: isCreateUserLoading }] =
    useCreateUserMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const { data: user, isLoading: isCheckingAuth } = useCheckAuthQuery();
  const [verifyOtp, { isLoading: verifyLoading }] = useVerifyOtpMutation();
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
  const [forgetPassword, { isLoading: forgetPasswordLoading }] =
    useForgetPasswordMutation();
  const [resetPassword, { isLoading: resetPasswordLoading }] =
    useResetPasswordMutation();
  const [
    verifyOtpForgetPassword,
    { isLoading: verifyOtpForgetPasswordLoading },
  ] = useVerifyOtpForgetPasswordMutation();

  const { data: users, isLoading: getUsersLoading } = useGetAllUsersQuery({
    page: currentPage,
  });

  const router = useRouter();

  const handleCreateUser = async (userData: UserData): Promise<void> => {
    try {
      const response = await createUser(userData).unwrap();
      toast("User created successfully");
    } catch (error: unknown) {
      const apiError = error as ApiResponse;
      toast(
        apiError?.error?.data?.message ||
          "User creation failed. Please try again."
      );
      console.log("Registration error:", error);
      throw error;
    }
  };

  const handleLogin = async (credentials: Credentials): Promise<void> => {
    try {
      const response = await login(credentials).unwrap();
      console.log("Login successful:", response);
      if (response) {
        toast("Login Successful");
        router.push("/");
      }
    } catch (error: unknown) {
      const apiError = error as ApiResponse;
      toast(
        apiError?.error?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleVerifyOtp = async (credentials: Credentials): Promise<void> => {
    await verifyOtp(credentials).unwrap();
    toast("Registration successful");
  };

  const handleForgetPassword = async (
    credentials: Credentials
  ): Promise<void> => {
    try {
      await forgetPassword(credentials).unwrap();
      toast("OTP sent to your email");
      router.push("/auth/reset-password");
    } catch (error: unknown) {
      const apiError = error as ApiResponse;
      toast(
        apiError?.error?.data?.message ||
          "Failed to send OTP. Please try again."
      );
    }
  };

  const handleVerifyOtpForgetPassword = async (
    credentials: Credentials
  ): Promise<void> => {
    try {
      await verifyOtpForgetPassword(credentials).unwrap();
      toast("Verification successful");
    } catch (error: unknown) {
      const apiError = error as ApiResponse;
      toast(
        apiError?.error?.data?.message ||
          "Verification failed. Please try again."
      );
    }
  };

  const handleResetPassword = async (
    credentials: Credentials
  ): Promise<void> => {
    try {
      const res = await resetPassword(credentials).unwrap();
      if (res) {
        toast("Password reset successfully");
        router.push("/auth/login");
      }
    } catch (error: unknown) {
      const apiError = error as ApiResponse;
      toast(
        apiError?.error?.data?.message ||
          "Failed to reset password. Please try again."
      );
    }
  };

  const handleLogout = async (): Promise<void> => {
    await logout();
    toast("Logged out successfully");
    router.push("/");
  };

  const handlePageChange = (newPage: number): void => {
    setCurrentPage(newPage);
  };

  return {
    handleCreateUser,
    login: handleLogin,
    user: user?.data,
    logout: handleLogout,
    verifyOtp: handleVerifyOtp,
    forgetPassword: handleForgetPassword,
    resetPassword: handleResetPassword,
    verifyOtpForgetPassword: handleVerifyOtpForgetPassword,
    loading:
      isCreateUserLoading ||
      isLoggingIn ||
      logoutLoading ||
      verifyLoading ||
      forgetPasswordLoading ||
      resetPasswordLoading ||
      verifyOtpForgetPasswordLoading,
    isCheckingAuth,
    users: users?.data?.users,
    currentPage,
    handlePageChange,
    totalPages: users?.data?.totalPages,
    getUsersLoading,
  };
}
