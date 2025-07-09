"use client";
import Features from "@/components/molecules/Features";
import Footer from "@/components/molecules/Footer";
import Hero from "@/components/molecules/Hero";
import LandingPageHeader from "@/components/molecules/LandingPageHeader";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // socketConnection();
      const redirectPath = getRedirectPath(user?.role);
      if (redirectPath !== window.location.pathname) {
        router.push(redirectPath);
      }
    } else {
      // socketDisconnection();
      if (window.location.pathname !== "/auth/login") {
        router.push("/auth/login");
      }
    }
  }, [user, router]);

  const getRedirectPath = (role) => {
    switch (role) {
      case "admin":
        return "/admin-dashboard";
      case "client":
        return "/client-dashboard";
      default:
        return "/";
    }
  };
  return (
    <div>
      <LandingPageHeader />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
