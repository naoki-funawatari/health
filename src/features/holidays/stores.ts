import { atom, selector } from "recoil";
import { defaultYear } from "@/stores/stores";
import { IHoliday } from "@/interfaces/interfaces";

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
  default: { isOpen: false },
});
