"use client";

import { createContext, useContext, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { BUSINESS } from "./data";

interface PersonalizedBusiness {
  name: string;
  phone: string;
  phoneRaw: string;
  city: string;
  state: string;
  rating: string;
  reviewCount: string;
  jobsCompleted: string;
}

const PersonalizationContext = createContext<PersonalizedBusiness>({
  name: BUSINESS.name,
  phone: BUSINESS.phone,
  phoneRaw: BUSINESS.phoneRaw,
  city: BUSINESS.city,
  state: BUSINESS.state,
  rating: BUSINESS.rating,
  reviewCount: BUSINESS.reviewCount,
  jobsCompleted: BUSINESS.jobsCompleted,
});

function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "");
  if (d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  return raw;
}

export function PersonalizationProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();

  const value = useMemo(() => {
    const nameParam = searchParams.get("name");
    const cityParam = searchParams.get("city");
    const phoneParam = searchParams.get("phone");
    const ratingParam = searchParams.get("rating");
    const reviewsParam = searchParams.get("reviews");
    const jobsParam = searchParams.get("jobs");

    const phoneRaw = phoneParam ? `+1${phoneParam.replace(/\D/g, "")}` : BUSINESS.phoneRaw;
    const phoneDisplay = phoneParam ? formatPhone(phoneParam) : BUSINESS.phone;

    return {
      name: nameParam || BUSINESS.name,
      phone: phoneDisplay,
      phoneRaw,
      city: cityParam || BUSINESS.city,
      state: BUSINESS.state,
      rating: ratingParam || BUSINESS.rating,
      reviewCount: reviewsParam || BUSINESS.reviewCount,
      jobsCompleted: jobsParam || BUSINESS.jobsCompleted,
    };
  }, [searchParams]);

  return (
    <PersonalizationContext.Provider value={value}>
      {children}
    </PersonalizationContext.Provider>
  );
}

export function usePersonalization() {
  return useContext(PersonalizationContext);
}
