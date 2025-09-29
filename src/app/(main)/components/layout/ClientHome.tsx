"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useShallow } from "zustand/shallow";

import { Route } from "@/types/route.type";
import Header from "./Header";
import HeroSection from "./HeroSection";
import RoutesPage from "./RoutesSection";
import SearchResultSection from "./SearchResultSection";
import ServiceSection from "./ServiceSection";
import FeaturesSection from "./FeaturesSection";
import UserFooter from "./Footer";
import { Schedule } from "@/types/schedule.type";
import AOS from "aos";

export default function ClientHome({ routes }: { routes: Route[] }) {
  const { fetchUser } = useAuthStore(
    useShallow((state) => ({ fetchUser: state.fetchUser }))
  );

  const scheduleSectionRef = useRef<HTMLDivElement>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [showSchedules, setShowSchedules] = useState(false);

  useEffect(() => {
    fetchUser();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <HeroSection
        setSchedules={setSchedules}
        setShowSchedule={setShowSchedules}
        scheduleSectionRef={scheduleSectionRef}
        setHasSearched={setHasSearched}
      />

      {/* SSR data dari page.tsx dilempar ke sini */}
      <RoutesPage
        routes={routes}
        scheduleSectionRef={scheduleSectionRef}
        setShowSchedule={setShowSchedules}
        setSchedules={setSchedules}
      />

      <SearchResultSection
        schedules={schedules}
        showSchedules={showSchedules}
        hasSearched={hasSearched}
        ref={scheduleSectionRef}
      />

      <ServiceSection />
      <FeaturesSection />
      <UserFooter />
    </div>
  );
}
