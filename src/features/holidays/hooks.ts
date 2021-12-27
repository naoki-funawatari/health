import { useMemo } from "react";
import { useQuery, useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { defaultYear } from "@/stores/stores";
import { fetchHolidays, registerHoliday, updateHoliday, deleteHoliday } from "@/apis/apis";
import { IHoliday } from "@/interfaces/interfaces";
import { holidaysState } from "@/features/holidays/stores";

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

export function useFetchHolidays() {
  const setState = useSetRecoilState(holidaysState);
  const onSuccess = (data: IHoliday[]): void => setState(data || []);

  return useQuery(["holidays"], fetchHolidays, { onSuccess });
}

export function useRegisterHoliday() {
  const setState = useSetRecoilState(holidaysState);
  const onSuccess = (data: IHoliday[]): void => setState(data || []);

  return useMutation(["holidays"], (holiday: IHoliday) => registerHoliday(holiday), { onSuccess });
}

export function useUpdateHolidays() {
  const setState = useSetRecoilState(holidaysState);
  const onSuccess = (data: IHoliday[]): void => setState(data || []);

  return useMutation(["holidays"], (holiday: IHoliday) => updateHoliday(holiday.id, holiday.name), {
    onSuccess,
  });
}

export function useDeleteHolidays() {
  const setState = useSetRecoilState(holidaysState);
  const onSuccess = (data: IHoliday[]): void => setState(data || []);

  return useMutation(["holidays"], (holiday: IHoliday) => deleteHoliday(holiday.id), { onSuccess });
}
