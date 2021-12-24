import { atom, selector } from "recoil";
import { IHoliday } from "@/interfaces/interfaces";
import { defaultMonth, defaultYear, defaultDay } from "@/stores/stores";

export const holidayTableState = atom({
  key: "holidayTableState",
  default: { year: defaultYear },
});

export const holidaysState = atom<IHoliday[]>({
  key: "holidaysState",
  default: [],
});

export const filteredHolidaysState = selector({
  key: "filteredHolidaysState",
  get: ({ get }) => {
    const holidays = get(holidaysState);
    const { year } = get(holidayTableState);
    return holidays.filter(o => o.date.startsWith(year));
  },
});

export const editDialogState = atom({
  key: "editDialogState",
  default: {
    isOpen: false,
    id: -1,
    name: "",
  },
});

export const registerDialogState = atom({
  key: "registerDialogState",
  default: {
    isOpen: false,
    year: defaultYear,
    month: defaultMonth,
    day: defaultDay,
    name: "",
  },
});

export const newHolidayState = selector<IHoliday>({
  key: "newHolidayState",
  get: ({ get }) => {
    const holiday = get(registerDialogState);
    const id = 0;
    const date = `${holiday.year}/${holiday.month}/${holiday.day}`;
    const name = holiday.name;

    return { id, date, name };
  },
});
