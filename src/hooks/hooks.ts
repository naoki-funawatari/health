import { useCallback } from "react";
import { useQuery, useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import {
  fetchConditions,
  fetchEmployees,
  fetchHolidays,
  registerHoliday,
  deleteHoliday,
  fetchReports,
  updateReports,
} from "@/apis/apis";
import { IConditions, IEmployee, IHolidays, IReport } from "@/interfaces/interfaces";
import { conditionsState, employeesState, holidaysState, reportsState } from "@/stores/stores";

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

export function useFetchHolidays() {
  const setState = useSetRecoilState(holidaysState);
  const onSuccess = (data: IHolidays[]): void => setState(data || []);

  return useQuery(["holidays"], fetchHolidays, { onSuccess });
}

export function useRegisterHolidays(holiday: IHolidays) {
  const setState = useSetRecoilState(holidaysState);
  const onSuccess = (data: IHolidays[]): void => setState(data || []);

  return useMutation(["holidays"], () => registerHoliday(holiday), { onSuccess });
}

export function useDeleteHolidays(id: number) {
  const setState = useSetRecoilState(holidaysState);
  const onSuccess = (data: IHolidays[]): void => setState(data || []);

  return useMutation(["holidays", id], () => deleteHoliday(id), { onSuccess });
}

export function useFetchReports(year: string, month: string) {
  const setState = useSetRecoilState(reportsState);
  const onSuccess = (data: IReport[]): void => setState(data || []);

  return useQuery(["reports", year, month], () => fetchReports(year, month), { onSuccess });
}

export function useUpdateReports(year: string, month: string, props: IReport[]) {
  const setState = useSetRecoilState(reportsState);
  const onSuccess = (data: IReport[]): void => setState(data || []);

  return useMutation("reports", () => updateReports(year, month, props), { onSuccess });
}
