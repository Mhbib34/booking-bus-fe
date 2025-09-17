import React from "react";
import { Bus } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Main Logo Animation */}
        <div className="relative mb-8">
          {/* Bus Icon with Pulse */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full animate-pulse">
            <Bus className="h-10 w-10 text-white" />
          </div>

          {/* Rotating Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-700 border-t-blue-500 animate-spin"></div>

          {/* Outer Glow Effect */}
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-ping"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">BusKu</h2>
          <p className="text-gray-400 animate-pulse">Loading...</p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
