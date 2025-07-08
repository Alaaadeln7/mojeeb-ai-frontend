"use client";
import {
  useCheckAuthQuery,
  useCreateUserMutation,
  useForgetPasswordMutation,
  useGetAllUsersQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useVerifyOtpForgetPasswordMutation,
  useVerifyOtpMutation,
} from "@/store/api/authApiSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

interface UserData {
  // Define the shape of your user data here
  [key: string]: any;
}

interface Credentials {
  // Define the shape of your credentials here
  [key: string]: any;
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
      toast("Login Successful");
      router.push("/");
    } catch (error: unknown) {
      const apiError = error as ApiResponse;
      toast(
        apiError?.error?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleVerifyOtp = async (credentials: Credentials): Promise<void> => {
    const res = (await verifyOtp(credentials)) as ApiResponse;
    console.log(res);
    if (res?.data) {
      toast("Registration successful");
    }
  };

  const handleForgetPassword = async (
    credentials: Credentials
  ): Promise<void> => {
    const res = (await forgetPassword(credentials)) as ApiResponse;
    if (res?.data) {
      toast("OTP sent to your email");
      router.push("/auth/reset-password");
    }
  };

  const handleVerifyOtpForgetPassword = async (
    credentials: Credentials
  ): Promise<void> => {
    const res = (await verifyOtpForgetPassword(credentials)) as ApiResponse;
    if (res?.data) {
      toast("Verification successful");
    }
  };

  const handleResetPassword = async (
    credentials: Credentials
  ): Promise<void> => {
    const res = (await resetPassword(credentials)) as ApiResponse;
    if (res?.data) {
      toast("Password reset successfully");
      router.push("/auth/login");
    }
  };

  const handleLogout = async (): Promise<void> => {
    const res = await logout();
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
