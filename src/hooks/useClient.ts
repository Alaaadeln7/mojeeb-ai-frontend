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
import { toast } from "sonner";

// Define your types
interface User {
  id: string;
  email: string;
  name: string;
  // Add other user properties as needed
}

interface AuthResponse {
  data?: {
    message: string;
    user?: User;
    token?: string;
    // Add other success response properties
  };
  error?: {
    status: number;
    data: {
      message: string;
      errors?: Record<string, string[]>;
    };
  };
}

interface PaginatedUsersResponse {
  data?: {
    users: User[];
    totalPages: number;
    currentPage: number;
  };
  error?: {
    status: number;
    data: {
      message: string;
    };
  };
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  // Add other registration fields as needed
}

interface OtpVerificationCredentials {
  email: string;
  otp: string;
}

interface ResetPasswordCredentials {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
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

  const handleCreateUser = async (
    userData: RegisterCredentials
  ): Promise<void> => {
    try {
      const response = await createUser(userData).unwrap();
      toast.success("User created successfully");
    } catch (error: unknown) {
      if (isAuthResponseError(error)) {
        toast.error(
          error.data.message || "User creation failed. Please try again."
        );
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error("Registration error:", error);
      throw error;
    }
  };

  const handleLogin = async (credentials: LoginCredentials): Promise<void> => {
    try {
      const response = await login(credentials).unwrap();
      console.log("Login successful:", response);
      toast.success("Login Successful");
      router.push("/");
    } catch (error: unknown) {
      if (isAuthResponseError(error)) {
        toast.error(error.data.message || "Login failed. Please try again.");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleVerifyOtp = async (
    credentials: OtpVerificationCredentials
  ): Promise<void> => {
    try {
      const res = await verifyOtp(credentials).unwrap();
      if (res) {
        toast.success("Registration completed successfully");
      }
    } catch (error: unknown) {
      if (isAuthResponseError(error)) {
        toast.error(error.data.message || "OTP verification failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleForgetPassword = async (
    credentials: Pick<LoginCredentials, "email">
  ): Promise<void> => {
    try {
      const res = await forgetPassword(credentials).unwrap();
      if (res) {
        toast.success("OTP sent to your email");
        router.push("/auth/reset-password");
      }
    } catch (error: unknown) {
      if (isAuthResponseError(error)) {
        toast.error(error.data.message || "Failed to send OTP");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleVerifyOtpForgetPassword = async (
    credentials: OtpVerificationCredentials
  ): Promise<void> => {
    try {
      const res = await verifyOtpForgetPassword(credentials).unwrap();
      if (res) {
        toast.success("OTP verified successfully");
      }
    } catch (error: unknown) {
      if (isAuthResponseError(error)) {
        toast.error(error.data.message || "OTP verification failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleResetPassword = async (
    credentials: ResetPasswordCredentials
  ): Promise<void> => {
    try {
      const res = await resetPassword(credentials).unwrap();
      if (res) {
        toast.success("Password reset successfully");
        router.push("/auth/login");
      }
    } catch (error: unknown) {
      if (isAuthResponseError(error)) {
        toast.error(error.data.message || "Password reset failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await logout().unwrap();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error: unknown) {
      if (isAuthResponseError(error)) {
        toast.error(error.data.message || "Logout failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handlePageChange = (newPage: number): void => {
    setCurrentPage(newPage);
  };

  // Type guard for AuthResponse error
  function isAuthResponseError(
    error: unknown
  ): error is { data: { message: string } } {
    return (
      typeof error === "object" &&
      error !== null &&
      "data" in error &&
      typeof (error as { data: unknown }).data === "object" &&
      (error as { data: { message?: unknown } }).data?.message !== undefined
    );
  }

  return {
    handleCreateUser,
    login: handleLogin,
    user: user?.data as User | undefined,
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
    users: (users as PaginatedUsersResponse)?.data?.users,
    currentPage,
    handlePageChange,
    totalPages: (users as PaginatedUsersResponse)?.data?.totalPages,
    getUsersLoading,
  };
}
