import React from "react";

type Props = {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color?: string;
};

const StatsCard = ({ title, value, icon: Icon, color = "blue" }: Props) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-${color}-900/30`}>
          <Icon className={`h-6 w-6 text-${color}-400`} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
