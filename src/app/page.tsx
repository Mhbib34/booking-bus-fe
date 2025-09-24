"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useShallow } from "zustand/shallow";
import Header from "./(main)/components/layout/Header";
import HeroSection from "./(main)/components/layout/HeroSection";
import { Schedule } from "@/types/schedule.type";
import SearchResultSection from "./(main)/components/layout/SearchResultSection";
import RoutesSection from "./(main)/components/layout/RoutesSection";
import ServiceSection from "./(main)/components/layout/ServiceSection";
import FeaturesSection from "./(main)/components/layout/FeaturesSection";
import UserFooter from "./(main)/components/layout/Footer";

const Home = () => {
  const { fetchUser } = useAuthStore(
    useShallow((state) => {
      return { fetchUser: state.fetchUser };
    })
  );
  const scheduleSectionRef = useRef<HTMLDivElement>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const [showSchedules, setShowSchedules] = useState(false);

  useEffect(() => {
    fetchUser();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection
        setSchedules={setSchedules}
        setShowSchedule={setShowSchedules}
        scheduleSectionRef={scheduleSectionRef}
        setHasSearched={setHasSearched}
      />

      {/* Popular Routes */}
      <RoutesSection
        scheduleSectionRef={scheduleSectionRef}
        setShowSchedule={setShowSchedules}
        setSchedules={setSchedules}
      />

      {/* Search Results */}
      <SearchResultSection
        schedules={schedules}
        showSchedules={showSchedules}
        hasSearched={hasSearched}
        ref={scheduleSectionRef}
      />

      {/* Services Info */}
      <ServiceSection />

      {/* Features */}
      <FeaturesSection />

      {/* Footer */}
      <UserFooter />
    </div>
  );
};

export default Home;
