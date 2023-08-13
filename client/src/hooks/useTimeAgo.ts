import { useState } from "react";

interface Data {
  createdDate: Date | string;
}

type TimeAgo = {
  value: number;
  unit: string;
};

const useTimeAgo = (data: Data | null): TimeAgo | null => {
  const [timeAgo, setTimeAgo] = useState<TimeAgo | null>(null);

  const calculateTimeAgo = () => {
    const currentDate = new Date();
    const createdDate =
      data?.createdDate instanceof Date
        ? data.createdDate
        : new Date(data?.createdDate || currentDate);
    const diffInSeconds = Math.floor(
      (currentDate.getTime() - createdDate.getTime()) / 1000
    );

    if (diffInSeconds < 60) {
      return { value: diffInSeconds, unit: "second" };
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return { value: diffInMinutes, unit: "minute" };
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return { value: diffInHours, unit: "hour" };
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return { value: diffInDays, unit: "day" };
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return { value: diffInWeeks, unit: "week" };
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return { value: diffInMonths, unit: "month" };
    }

    const diffInYears = Math.floor(diffInDays / 365);
    return { value: diffInYears, unit: "year" };
  };

  if (data?.createdDate) {
    if (!timeAgo) {
      setTimeAgo(calculateTimeAgo());
    }
  } else {
    setTimeAgo(null);
  }

  return timeAgo;
};

export default useTimeAgo;
