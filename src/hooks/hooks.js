import { useMemo } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import reports from "@/db/records/reports.json";

const useTaegetDate = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("Asia/Tokyo");

  const tzDate = dayjs().tz();
  const tzStartDate = tzDate.startOf("month");
  const tzEndtDate = tzDate.endOf("month");
  const year = Number(tzStartDate.format("YYYY"));
  const month = Number(tzStartDate.format("M"));
  const endDay = Number(tzEndtDate.format("D"));
  const days = [...new Array(endDay).keys()].map((_, i) => tzStartDate.add(i, "day").clone());

  return { year, month, days };
};

const useFetchHealthData = (year, month) => {
  return useMemo(() => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault("Asia/Tokyo");

    return reports
      .filter(o => Number(dayjs(o.date).tz().format("YYYY")) === Number(year))
      .filter(o => Number(dayjs(o.date).tz().format("M")) === Number(month));
  }, [year, month]);
};

export { useTaegetDate, useFetchHealthData };
