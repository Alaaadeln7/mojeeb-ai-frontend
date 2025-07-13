"use client";
import Features from "@/components/molecules/Features";
import Footer from "@/components/molecules/Footer";
import Hero from "@/components/molecules/Hero";
import LandingPageHeader from "@/components/molecules/LandingPageHeader";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const redirectPath = getRedirectPath(user?.role);
      if (redirectPath !== window.location.pathname) {
        router.push(redirectPath);
      }
    }
  }, [user, router]);

  const getRedirectPath = (role: string) => {
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
      <h1>hello world</h1>
    </div>
  );
}
