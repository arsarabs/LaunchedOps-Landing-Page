"use client";

import { createContext, useContext, useMemo, useEffect } from "react";
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

const STORAGE_KEY = "launchedops_demo";

function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "");
  if (d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  return raw;
}

function getStored(): Record<string, string> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function PersonalizationProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();

  const value = useMemo(() => {
    // URL params take priority, then sessionStorage, then defaults
    const stored = getStored();

    const nameParam = searchParams.get("name") || stored.name;
    const cityParam = searchParams.get("city") || stored.city;
    const phoneParam = searchParams.get("phone") || stored.phone;
    const ratingParam = searchParams.get("rating") || stored.rating;
    const reviewsParam = searchParams.get("reviews") || stored.reviews;
    const jobsParam = searchParams.get("jobs") || stored.jobs;

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
      // keep raw params for storage
      _raw: { name: nameParam, city: cityParam, phone: phoneParam, rating: ratingParam, reviews: reviewsParam, jobs: jobsParam },
    };
  }, [searchParams]);

  // Persist to sessionStorage whenever URL params are present
  useEffect(() => {
    const raw = (value as PersonalizedBusiness & { _raw: Record<string, string | undefined> })._raw;
    const hasParams = Object.values(raw).some(Boolean);
    if (hasParams) {
      const toStore: Record<string, string> = {};
      for (const [k, v] of Object.entries(raw)) {
        if (v) toStore[k] = v as string;
      }
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    }
  }, [value]);

  return (
    <PersonalizationContext.Provider value={value}>
      {children}
    </PersonalizationContext.Provider>
  );
}

export function usePersonalization() {
  return useContext(PersonalizationContext);
}
