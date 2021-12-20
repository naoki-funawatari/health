import { useMemo } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { defaultYear } from "@/stores/stores";

export function useYears() {
  const years = useMemo(() => {
    return [0, 1, 2].map(o => `${Number(defaultYear) + o}`);
  }, []);

  return years;
}

export function useMonths() {
  const months = useMemo(() => {
    return [...Array(12)].map((_, i) => `${i + 1}`.padStart(2, "0"));
  }, []);

  return months;
}

export function useDays(year: string, month: string) {
  const days = useMemo(() => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault("Asia/Tokyo");
    const tzDate = dayjs(`${year}/${month}/01`).tz();
    const tzEndtDate = tzDate.endOf("month");
    const endDay = Number(tzEndtDate.format("D"));

    return [...Array(endDay)].map((_, i) => `${i + 1}`.padStart(2, "0"));
  }, [year, month]);

  return days;
}
