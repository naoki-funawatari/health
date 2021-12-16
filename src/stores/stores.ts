import { atom, selector } from "recoil";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { IConditions, IEmployee, IHolidays, IReport } from "@/interfaces/interfaces";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

const tzDate = dayjs().tz();
export const defaultYear = tzDate.format("YYYY");
export const defaultMonth = tzDate.format("MM");

export const yearMonthState = atom({
  key: "yearMonthState",
  default: { year: defaultYear, month: defaultMonth },
});

export const dateListState = selector({
  key: "dateListState",
  get({ get }) {
    const { year, month } = get(yearMonthState);
    const tzDate = dayjs(`${year}/${month}/01`).tz();
    const tzEndtDate = tzDate.endOf("month");
    const endDay = Number(tzEndtDate.format("D"));
    const dates: {
      object: Dayjs;
      value: string;
      day: string;
      weekday: string;
    }[] = [];

    for (let i = 0; i < endDay; i++) {
      const object = tzDate.add(i, "day").clone();
      dates.push({
        object,
        day: object.format("DD"),
        value: object.format("YYYY/MM/DD"),
        weekday: object.format("d"),
      });
    }

    return dates;
  },
});

export const isOpenState = atom<boolean>({
  key: "isOpenState",
  default: false,
});

export const conditionsState = atom<IConditions[]>({
  key: "conditionsState",
  default: [],
});

export const employeesState = atom<IEmployee[]>({
  key: "employeesState",
  default: [],
});

export const holidaysState = atom<IHolidays[]>({
  key: "holidaysState",
  default: [],
});

export const reportsState = atom<IReport[]>({
  key: "reportsState",
  default: [],
});

export const changedReportsState = selector<IReport[]>({
  key: "changedReportsState",
  get({ get }) {
    const reports = get(reportsState);
    const changed = reports.filter(o => o.isChanged);
    return changed;
  },
});
