export const getFacilityIcon = (facility: string) => {
  const facilityMap: { [key: string]: string } = {
    ac: "❄️",
    wifi: "📶",
    tv: "📺",
    toilet: "🚽",
    reclining_seat: "🛋️",
    charging_port: "🔌",
  };
  return facilityMap[facility] || "✓";
};

export const getFacilityLabel = (facility: string) => {
  const facilityMap: { [key: string]: string } = {
    ac: "AC",
    wifi: "WiFi",
    tv: "TV",
    toilet: "Toilet",
    reclining_seat: "Kursi Rebah",
    charging_port: "Charging Port",
  };
  return facilityMap[facility] || facility;
};
