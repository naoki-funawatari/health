import { atom } from "recoil";
import { IConditions, IEmployee } from "@/apis/apis";

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
