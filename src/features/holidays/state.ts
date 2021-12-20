import { atom, selector } from "recoil";
import { IHolidays } from "@/interfaces/interfaces";
import { defaultMonth, defaultYear } from "@/stores/stores";

export const deleteDialogState = atom({
  key: "deleteDialogState",
  default: {
    isOpen: false,
    id: -1,
    name: "",
  },
});

export interface IHolidayState {
  year: string;
  month: string;
  day: string;
  name: string;
}

export const holidayState = atom<IHolidayState>({
  key: "holidayState",
  default: {
    year: defaultYear,
    month: defaultMonth,
    day: "01",
    name: "",
  },
});

export const newHolidayState = selector<IHolidays>({
  key: "newHolidayState",
  get: ({ get }) => {
    const holiday = get(holidayState);
    const id = 0;
    const date = `${holiday.year}/${holiday.month}/${holiday.day}`;
    const name = holiday.name;

    return { id, date, name };
  },
});
