import { atom } from "recoil";
import { IConditions, IEmployee, IReport } from "@/apis/apis";

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

export const reportsState = atom<IReport[]>({
  key: "reportsState",
  default: [],
});
