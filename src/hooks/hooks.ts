import { useCallback, useMemo } from "react";
import { useQuery, useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { fetchConditions, fetchEmployees, fetchReports, updateReports } from "@/apis/apis";
import { IConditions, IEmployee, IReport } from "@/interfaces/interfaces";
import { conditionsState, employeesState, reportsState } from "@/stores/stores";

export function useSyncScroll() {
  return useCallback((e: React.UIEvent) => {
    const employeeListWrapper = document.getElementById("employee-list-wrapper") as HTMLDivElement;
    if (employeeListWrapper) {
      employeeListWrapper.scrollTop = (e.target as HTMLDivElement).scrollTop;
    }

    const dateListWrapper = document.getElementById("date-list-wrapper") as HTMLDivElement;
    if (dateListWrapper) {
      dateListWrapper.scrollLeft = (e.target as HTMLDivElement).scrollLeft;
    }
  }, []);
}

export function useTaegetDate() {
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
    const dates = days.map(o => o.format("YYYY/MM/DD"));

    return { year, month, dates, days };
  }, []);
}

export function useFetchConditions() {
  const setState = useSetRecoilState(conditionsState);
  const onSuccess = (data: IConditions[]): void => setState(data || []);

  return useQuery("conditions", fetchConditions, { onSuccess });
}

export function useFetchEmployees() {
  const setState = useSetRecoilState(employeesState);
  const onSuccess = (data: IEmployee[]): void => setState(data || []);

  return useQuery("employees", fetchEmployees, { onSuccess });
}

export function useFetchReports(year: string, month: string) {
  const setState = useSetRecoilState(reportsState);
  const onSuccess = (data: IReport[]): void => setState(data || []);

  return useQuery("reports", () => fetchReports(year, month), { onSuccess });
}

export function useUpdateReports(year: string, month: string, props: IReport[]) {
  const setState = useSetRecoilState(reportsState);
  const onSuccess = (data: IReport[]): void => setState(data || []);

  return useMutation("reports", () => updateReports(year, month, props), { onSuccess });
}
