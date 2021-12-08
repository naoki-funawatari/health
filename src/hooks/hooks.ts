import { useMemo } from "react";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { fetchConditions, fetchEmployees, fetchReports } from "../apis/apis";

const useTaegetDate = () => {
  return useMemo(() => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault("Asia/Tokyo");

    const tzDate = dayjs().tz();
    const tzStartDate = tzDate.startOf("month");
    const tzEndtDate = tzDate.endOf("month");
    const year = Number(tzStartDate.format("YYYY")).toString();
    const month = Number(tzStartDate.format("M")).toString();
    const endDay = Number(tzEndtDate.format("D"));
    const days = [...Array(endDay)].map((_, i) => tzStartDate.add(i, "day").clone());

    return { year, month, days };
  }, []);
};

const useConditions = () => useQuery("conditions", fetchConditions);

const useEmployees = () => useQuery("employees", fetchEmployees);

const useReports = () => useQuery("reports", fetchReports(null, null));

const useFetchHealthData = (year: string, month: string) =>
  useQuery("reports", fetchReports(year, month));

export { useTaegetDate, useConditions, useEmployees, useReports, useFetchHealthData };
