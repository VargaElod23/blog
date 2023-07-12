import React, { Dispatch, SetStateAction } from "react";

type RangePickerProps = {
  days: number;
  fetchStats: Dispatch<SetStateAction<number>>;
};

export const RangePicker = ({ days, fetchStats }: RangePickerProps) => {
  return (
    <div>
      <label
        htmlFor="default-range"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        See stats for {days} days:
      </label>
      <input
        id="default-range"
        type="range"
        min="0"
        max="365"
        value={days}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        onChange={(e) => {
          fetchStats(Number(e.target.value));
        }}
      />
    </div>
  );
};
