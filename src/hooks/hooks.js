import { useMemo } from "react";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const fetchReports = async () => {
  const res = await fetch("http://localhost:3001/api/v1/reports");
  return res.json();
};

const useTaegetDate = () => {
  return useMemo(() => {
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
  }, []);
};

const useFetchHealthData = (year, month) => {
  const reports = useQuery("reports", fetchReports);
  if (reports.isLoading) return [];

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("Asia/Tokyo");

  return reports.data
    .filter(o => Number(dayjs(o.date).tz().format("YYYY")) === Number(year))
    .filter(o => Number(dayjs(o.date).tz().format("M")) === Number(month));
};

export { useTaegetDate, useFetchHealthData };
