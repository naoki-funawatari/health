import { atom, selector } from "recoil";
import { IConditions, IEmployee, IHolidays, IReport } from "@/interfaces/interfaces";

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
